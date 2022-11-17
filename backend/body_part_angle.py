import mediapipe as mp
import pandas as pd
import numpy as np
import cv2
from pose_results import *


class BodyPartAngle:
    def __init__(self, landmarks):
        self.landmarks = landmarks

    def angle_of_the_left_arm(self):
        L_shoulder = detection_body_part(self.landmarks, 'LEFT_SHOULDER')
        L_elbow = detection_body_part(self.landmarks, 'LEFT_ELBOW')
        L_wrist = detection_body_part(self.landmarks, 'LEFT_WRIST')
        return calculate_angle(L_shoulder, L_elbow, L_wrist)

    def angle_of_the_right_arm(self):
        R_shoulder = detection_body_part(self.landmarks, 'RIGHT_SHOULDER')
        R_elbow = detection_body_part(self.landmarks, 'RIGHT_ELBOW')
        R_wrist = detection_body_part(self.landmarks, 'RIGHT_WRIST')
        return calculate_angle(R_shoulder, R_elbow, R_wrist)

    def angle_of_the_left_leg(self):
        L_hip = detection_body_part(self.landmarks, 'LEFT_HIP')
        L_knee = detection_body_part(self.landmarks, 'LEFT_KNEE')
        L_ankle = detection_body_part(self.landmarks, 'LEFT_ANKLE')
        return calculate_angle(L_hip, L_knee, L_ankle)

    def angle_of_the_right_leg(self):
        R_hip = detection_body_part(self.landmarks, 'RIGHT_HIP')
        R_knee = detection_body_part(self.landmarks, 'RIGHT_KNEE')
        R_ankle = detection_body_part(self.landmarks, 'RIGHT_ANKLE')
        return calculate_angle(R_hip, R_knee, R_ankle)

    def angle_of_the_neck(self):
        R_shoulder = detection_body_part(self.landmarks, 'RIGHT_SHOULDER')
        L_shoulder = detection_body_part(self.landmarks, 'LEFT_SHOULDER')
        R_mouth = detection_body_part(self.landmarks, 'MOUTH_RIGHT')
        L_mouth = detection_body_part(self.landmarks, 'MOUTH_LEFT')
        R_hip = detection_body_part(self.landmarks, 'RIGHT_HIP')
        L_hip = detection_body_part(self.landmarks, 'LEFT_HIP')

        shoulder_avg = [(R_shoulder[0] + L_shoulder[0]) / 2,
                        (R_shoulder[1] + L_shoulder[1]) / 2]
        mouth_avg = [(R_mouth[0] + L_mouth[0]) / 2,
                     (R_mouth[1] + L_mouth[1]) / 2]
        hip_avg = [(R_hip[0] + L_hip[0]) / 2, (R_hip[1] + L_hip[1]) / 2]

        return abs(180 - calculate_angle(mouth_avg, shoulder_avg, hip_avg))

    def angle_of_the_abs(self):
        R_shoulder = detection_body_part(self.landmarks, 'RIGHT_SHOULDER')
        L_shoulder = detection_body_part(self.landmarks, 'LEFT_SHOULDER')
        shoulder_avg = [(R_shoulder[0] + L_shoulder[0]) / 2,
                        (R_shoulder[1] + L_shoulder[1]) / 2]

        R_hip = detection_body_part(self.landmarks, 'RIGHT_HIP')
        L_hip = detection_body_part(self.landmarks, 'LEFT_HIP')
        hip_avg = [(R_hip[0] + L_hip[0]) / 2, (R_hip[1] + L_hip[1]) / 2]

        R_knee = detection_body_part(self.landmarks, 'RIGHT_KNEE')
        L_knee = detection_body_part(self.landmarks, 'LEFT_KNEE')
        knee_avg = [(R_knee[0] + L_knee[0]) / 2, (R_knee[1] + L_knee[1]) / 2]

        return calculate_angle(shoulder_avg, hip_avg, knee_avg)
