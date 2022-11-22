import cv2
import argparse
from pose_results import *
import mediapipe as mp
from body_part_angle import BodyPartAngle
from exercise_types import TypeOfExercise
import time

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

def get_stream_video():
    if ex_test == 1:
        cap = cv2.VideoCapture('Validation/squat.mp4')
    else:
        cap = cv2.VideoCapture(0)

    cap.set(3, 800)  # width
    cap.set(4, 480)  # height

    # setup mediapipe
    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        counter = 0
        status = True
        while cap.isOpened():
            ret, frame = cap.read()
            frame = cv2.resize(frame, (800, 480), interpolation=cv2.INTER_LINEAR)
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frame = cv2.flip(frame, 1)
            frame.flags.writeable = False

            results = pose.process(frame)
            frame.flags.writeable = True
            frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

            try:
                landmarks = results.pose_landmarks.landmark
                counter, status = TypeOfExercise(landmarks).calculate_exercise(
                    'squat', counter, status)

            except:
                pass

            frame = score_table('squat', frame, counter, status)

            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(255, 255, 255), thickness=2, circle_radius=2))
            mp_drawing.draw_landmarks(frame, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                    mp_drawing.DrawingSpec(color=(175, 139, 45), thickness=2, circle_radius=2))

            # cv2.imshow('Video', frame)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(frame) + b'\r\n')
            # if cv2.waitKey(10) & 0xFF == ord('q'):
            #     print(counter)
            #     break
        cap.release()
        cv2.destroyAllWindows()