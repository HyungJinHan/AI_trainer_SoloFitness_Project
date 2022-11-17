import numpy as np
import pandas as pd
import mediapipe as mp
import cv2

mp_pose = mp.solutions.pose

# 각도계산


def calculate_angle(a, b, c):
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)

    radians = np.arctan2(c[1] - b[1], c[0] - b[0]) - \
        np.arctan2(a[1] - b[1], a[0] - b[0])
    angle = np.abs(radians * 180.0 / np.pi)

    if angle > 180.0:
        angle = 360 - angle

    return angle

# 관절 이름 입력하면 x값 좌표, y값 좌표, visibility 표시


def detection_body_part(landmarks, body_part_name):
    return [
        landmarks[mp_pose.PoseLandmark[body_part_name].value].x,
        landmarks[mp_pose.PoseLandmark[body_part_name].value].y,
        landmarks[mp_pose.PoseLandmark[body_part_name].value].visibility
    ]


def detection_body_parts(landmarks):
    body_parts = pd.DataFrame(columns=['body_part', 'x', 'y'])

    for i, mark in enumerate(mp_pose.PoseLandmark):
        mark = str(mark).split('.')[1]
        cord = detection_body_part(landmarks, mark)
        body_parts.loc[i] = mark, cord[0], cord[1]

    return body_parts

# 영상 프레임 단위마다 텍스트,텍스트좌표,폰트,폰트크기,폰트색상,폰트라인타입 등을 지정


def score_table(exercise, frame, counter, status):
    cv2.putText(frame, 'Activity : ' +
                exercise.replace('-', ' '), (10, 65), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2, cv2.LINE_AA)
    cv2.putText(frame, 'count : ' + str(counter), (10, 100),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2, cv2.LINE_AA)
    cv2.putText(frame, 'status :' + str(status), (10, 135),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2, cv2.LINE_AA)
    return frame
