import cv2
import os
import argparse
from pose_results import *
import mediapipe as mp
from body_part_angle import BodyPartAngle
from exercise_types import TypeOfExercise
from exercise_c_f import *
import torch
import numpy
import keyboard

# from main import exec_categories as cats

# argparse로 실행할때 쓰는 구문
# ap = argparse.ArgumentParser()
# ap.add_argument('-t', '--exercise_type', type=str,
#                 help='운동 종류 선택', required=True)

# ap.add_argument('-vs', '--video_source', type=str,
#                 help='운동 종류 선택(비디오)', required=False)

# args = vars(ap.parse_args())
# args = vars(ap.parse_args())

ex_test = 1
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
# 실시간 덤벨 측정 (사용 안할 시 주석 처리 바람)
# dumbellModel = torch.hub.load('ultralytics/yolov5','custom', path='./volov5_dumbbell_estimation/weights/best.pt',force_reload=True)

def get_stream_video():
    if ex_test == 1:
        cap = cv2.VideoCapture('Validation/{0}.mp4'.format(execList[-1]))
        # cap = cv2.VideoCapture('Validation/squat.mp4')
    elif ex_test == 0:
        cap = cv2.VideoCapture(0)
    else:
        return False
    cap.set(3, 350)  # width
    cap.set(4, 300)  # height
    # setup mediapipe
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        counter = 0
        status = True
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.resize(frame, (350, 300), interpolation=cv2.INTER_LINEAR)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = cv2.flip(frame, 1)
            frame.flags.writeable = False

            results = pose.process(frame)
            frame.flags.writeable = True
            frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

            try:
                landmarks = results.pose_landmarks.landmark
                counter, status = TypeOfExercise(landmarks).calculate_exercise(
                    execList[-1], counter, status)

            except:
                pass

            frame = score_table(execList[-1], frame, counter, status)

            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2))
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(175, 139, 45), thickness=2, circle_radius=2))

            # cv2.imshow('Video', frame)

            # 실시간 덤벨 측정 (사용 안할 시 주석 처리 바람)
            # modelFrame = dumbellModel(frame)
            # 실시간 덤벨 측정 (사용 안할 시 주석 처리 바람)
            # modelLabel = np.squeeze(modelFrame.render())
            
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(frame) + b'\r\n')
            if downCamera[-1] == countlist[-1]:
                downCamera.append(0)
                break

        # cap.release()
        # cv2.destroyAllWindows()