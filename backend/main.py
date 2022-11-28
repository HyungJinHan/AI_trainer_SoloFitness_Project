from fastapi.responses import StreamingResponse
from exercise_main import get_stream_video
import fastapi as fastapi
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket
from pydantic import BaseModel
import cv2
from exercise_c_f import *

app = fastapi.FastAPI()

origins = [
  "http://localhost:",
  "http://localhost:3000",
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

class exec_categories(BaseModel):
  exec: str

# openCV에서 이미지,영상 불러오는 함수
def video_streaming():
  return get_stream_video()

# 스트리밍 경로를 /video 경로로 설정
@app.get('/video')
def main1():
  # StringResponse함수를 return하고,
  # 인자로 OpenCV에서 가져온 "바이트"이미지와 type을 명시
  return StreamingResponse(video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")

# 운동 시작시 리액트에서 카운트 초기화
@app.get('/initialization')
def counterInitialization():
  countlist.append(0)
  countlist_c = [0]
  return {'countlist':countlist, 'countlist_c':countlist_c}

@app.post('/execcategories')
def exec_categories1(exec: exec_categories):
  exec_category = exec.exec
  execList.append(exec_category)

# 이새기 때문에 처음에 초기화 안됨
@app.get('/videocount')
def countchecker():
  print('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq',countlist)
  return {'count':countlist, 'squatFeedback':sqautFeedbackList, 'pushUpFeedback':pushUpFeedbackList, 'count_c':countlist_c}