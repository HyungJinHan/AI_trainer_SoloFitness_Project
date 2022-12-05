import numpy as np
from pose_results import *
from body_part_angle import BodyPartAngle
from main import *
from exercise_c_f import *

def exercise_counter(counter):
    videocounter = counter
    print(videocounter)
    return videocounter


class TypeOfExercise(BodyPartAngle):
    def __init__(self, landmarks):
        super().__init__(landmarks)


    def push_up(self, counter, status):
        left_arm_angle = self.angle_of_the_left_arm()
        right_arm_angle = self.angle_of_the_right_arm()
        avg_arm_angle = (left_arm_angle + right_arm_angle) // 2
        pushupFeedback_flag = True

        if status:
            if avg_arm_angle < 90:
                counter += 1
                status = False
                countlist.append(counter)
                countlist_c.append(counter)
                pushUpFeedbackList.append('Great!')
            if pushupFeedback_flag:
                if 91 < avg_arm_angle < 140:
                    pushUpFeedbackList.append('상체를 더 숙이세요.')
                    pushupFeedback_flag = False
        else:
            if avg_arm_angle > 160:
                status = True
                pushupFeedback_flag = True

        return [counter, status]

    def pull_up(self, counter, status):
        nose = detection_body_part(self.landmarks, 'NOSE')
        left_elbow = detection_body_part(self.landmarks, 'LEFT_ELBOW')
        right_elbow = detection_body_part(self.landmarks, 'RIGHT_ELBOW')
        avg_shoulder_y = (left_elbow[1] + right_elbow[1]) / 2

        if status:
            if nose[1] > avg_shoulder_y:
                counter += 1
                status = False
                countlist.append(counter)
                countlist_c.append(counter)
        else:
            if nose[1] < avg_shoulder_y:
                status = True
        return [counter, status]

    def squat(self, counter, status):
        left_leg_angle = self.angle_of_the_left_leg()
        right_leg_angle = self.angle_of_the_right_leg()
        avg_leg_angle = (left_leg_angle + right_leg_angle) // 2
        squatFeedback_flag = True
        
        # 무릎이 발보다 앞에있을때 피드백 변수
        right_knee = detection_body_part(self.landmarks, 'RIGHT_KNEE')
        left_knee = detection_body_part(self.landmarks, 'LEFT_KNEE')
        right_foot_index = detection_body_part(self.landmarks, 'RIGHT_FOOT_INDEX')
        left_foot_index = detection_body_part(self.landmarks, 'LEFT_FOOT_INDEX')
        avg_knee_x = (right_knee[0] + left_knee[0]) / 2
        avg_foot_index_x = (right_foot_index[0] + left_foot_index[0]) / 2
        
        # 어깨가 틀어졌을때 피드백 변수
        right_shoulder = detection_body_part(self.landmarks, 'RIGHT_SHOULDER')
        left_shoulder = detection_body_part(self.landmarks, 'LEFT_SHOULDER')
        

        if status:
            if avg_leg_angle < 70:
                counter += 1
                status = False
                countlist.append(counter)
                countlist_c.append(counter)
                sqautFeedbackList.append('Great!')
            if squatFeedback_flag:
                if 71 < avg_leg_angle < 140:
                    sqautFeedbackList.append('무릎을 더 굽히세요.')
                    squatFeedback_flag = False   
        else:
            if avg_leg_angle > 160:
                status = True
                squatFeedback_flag = True
                
        # 무릎이 발보다 앞에있을때 피드백 변수
        # if squatKneeFeedback_flag:
        #     if avg_knee_x > avg_foot_index_x:
        #         squatKneeFeedbackList.append('무릎이 발 밖으로 나갔습니다.')
        #         squatKneeFeedback_flag = False
        #         status = False
        # else:
        #     if avg_knee_x < avg_foot_index_x:
        #         squatKneeFeedbackList.append('')
        #         squatKneeFeedback_flag = True
        #         status = True
        
        # 어깨가 틀어졌을때 피드백
        if squatShoulderFeedbackFlag[-1]:
            if(np.abs((right_shoulder[1] - left_shoulder[1])) > 0.075):
                status = False
                squatShoulderFeedbackList.append('어깨 수평을 유지하세요.')
                squatShoulderFeedbackFlag.append(False)
        else:
            if(np.abs((right_shoulder[1] - left_shoulder[1])) < 0.065):
                status = True
                squatShoulderFeedbackFlag.append(True)
                squatShoulderFeedbackList.append('')
                
            

        return [counter, status]

    def sit_up(self, counter, status):
        abs_angle = self.angle_of_the_abs()
        if status:
            if abs_angle < 55:
                counter += 1
                status = False
                countlist.append(counter)
                countlist_c.append(counter)
        else:
            if abs_angle > 105:
                status = True
        return [counter, status]
    def curl(self, counter, status):
        left_arm_angle = self.angle_of_the_left_arm()
        right_arm_angle = self.angle_of_the_right_arm()
        avg_arm_angle = (left_arm_angle + right_arm_angle) // 2

        if status:
            if avg_arm_angle < 30:
                counter += 1
                status = False
                countlist.append(counter)
                countlist_c.append(counter)
        else:
            if avg_arm_angle > 140:
                status = True

        return [counter, status]

    def calculate_exercise(self, exercise_type, counter, status):
        if exercise_type == 'pushup':
            counter, status = TypeOfExercise(
                self.landmarks).push_up(counter, status)
        elif exercise_type == 'pullup':
            counter, status = TypeOfExercise(
                self.landmarks).pull_up(counter, status)
        elif exercise_type == 'squat':
            counter, status = TypeOfExercise(
                self.landmarks).squat(counter, status)
        elif exercise_type == 'situp':
            counter, status = TypeOfExercise(
                self.landmarks).sit_up(counter, status)
        elif exercise_type == 'curl':
            counter, status = TypeOfExercise(
                self.landmarks).curl(counter, status)
        return [counter, status]
