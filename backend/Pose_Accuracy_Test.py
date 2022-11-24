# 덤벨컬 운동의 정확도를 피드백 형식으로 측정
# 기준은 2가지로 각각 '손목 각도 170도 이상으로 유지(손목을 굽히지 말 것)'와 '팔꿈치 위치 고정(엉덩이 좌표와의 거리를 기준으로)'이다.
import cv2
import mediapipe as mp
import numpy as np
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def calculate_angle(a,b,c):
  a = np.array(a)
  b = np.array(b)
  c = np.array(c)

  radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
  angle = np.abs(radians*180.0/np.pi)

  if angle > 180.0:
    angle = 360 - angle

  return angle

cap = cv2.VideoCapture(0)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1300)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 1000)

with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
  while cap.isOpened():
    ret, frame = cap.read()

    # Recolor image to RGB
    image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    image.flags.writeable = False
    image = cv2.flip(image, 1)

    # Make Detection
    results = pose.process(image)

    # Recolor back to BGR
    image.flags.writeable = True
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

    # Extract landmarks
    try:
      landmarks = results.pose_landmarks.landmark

      # Get coordinate
      left_elbow = [round(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,2), round(landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y,2)]
      left_wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
      left_index = [landmarks[mp_pose.PoseLandmark.LEFT_INDEX.value].x, landmarks[mp_pose.PoseLandmark.LEFT_INDEX.value].y]

      right_elbow = [round(landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].x,2), round(landmarks[mp_pose.PoseLandmark.RIGHT_ELBOW.value].y,2)]
      right_wrist = [landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_WRIST.value].y]
      right_index = [landmarks[mp_pose.PoseLandmark.RIGHT_INDEX.value].x, landmarks[mp_pose.PoseLandmark.RIGHT_INDEX.value].y]

      left_hip = [round(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,2), round(landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y,2)]
      right_hip = [round(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].x,2), round(landmarks[mp_pose.PoseLandmark.RIGHT_SHOULDER.value].y,2)]

      # Calculate angle
      left_angle = calculate_angle(left_elbow, left_wrist, left_index)
      right_angle = calculate_angle(right_elbow, right_wrist, right_index)
    except:
      pass

    # Accuracy Feedback
    wrist_text = None
    elbow_text = None
    
    # if left_angle < 170: # 180도여야 하지만 오차 10도 정도는 허용
    #   wrist_text = "Don't bend your left wrist" # 한글로 하면 깨짐
    # if right_angle < 170:
    #   wrist_text = "Don't bend your right wrist"
    # if left_angle < 170 and right_angle < 170:
    #   wrist_text = "Don't bend your wrist!"

    if np.abs(left_elbow[0] - left_hip[0]) > 0.07 or np.abs(left_elbow[1] - left_hip[1]) > 0.5:
      elbow_text = "Fix your left elbow"
    if np.abs(right_elbow[0] - right_hip[0]) > 0.07 or np.abs(right_elbow[1] - right_hip[1]) > 0.5:
      elbow_text = "Fix your right elbow"
    if ((left_elbow[0] - left_hip[0]) > 0.07 or (left_elbow[1] - left_hip[1]) > 0.5) and ((right_elbow[0] - right_hip[0]) > 0.07 or (right_elbow[1] - right_hip[1]) > 0.5):
      elbow_text = "Fix your elbow!"

    # Render detections
    mp_drawing.draw_landmarks(image, results.pose_landmarks,
                              mp_pose.POSE_CONNECTIONS,
                              mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2),
                              mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2))
    # Visualize angle
    cv2.putText(image, str(round(left_angle, 2)),
                tuple(np.multiply(left_wrist, [1000, 800]).astype(int)),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2, cv2.LINE_AA)
    cv2.putText(image, str(round(right_angle, 2)),
                tuple(np.multiply(right_wrist, [1000, 800]).astype(int)),
                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 255, 255), 2, cv2.LINE_AA)
    # 70-74 라인에서 기준을 잡기 위해 보는 팔꿈치와 엉덩이 좌표
    # cv2.putText(image, str(left_elbow),
    #             tuple(np.multiply(left_elbow, [1000,800]).astype(int)),
    #             cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255), 2, cv2.LINE_AA)
    # cv2.putText(image, str(right_elbow),
    #             tuple(np.multiply(right_elbow, [1000,800]).astype(int)),
    #             cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0,0,255), 2, cv2.LINE_AA)
    #
    # cv2.putText(image, str(left_hip),
    #             tuple(np.multiply(left_hip, [1000,800]).astype(int)),
    #             cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255),2, cv2.LINE_AA)
    # cv2.putText(image, str(right_hip),
    #             tuple(np.multiply(right_hip, [1000, 800]).astype(int)),
    #             cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255),2, cv2.LINE_AA)

    # Render Feedback Text
    cv2.putText(image, wrist_text, (60,60),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (255,255,255), 2, cv2.LINE_AA)
    cv2.putText(image, elbow_text, (100, 100),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0, 255), 2, cv2.LINE_AA)

    cv2.imshow('MediaPipe Feed', image)
    if cv2.waitKey(10)&0xFF == ord('q'):
      break

  cap.release()
  cv2.destroyAllWindows()
