from fastapi.responses import StreamingResponse
from exercise_main import get_stream_video
from exercise_main_C import get_stream_video_C
import fastapi as fastapi
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from exercise_c_f import *
import cv2
import time

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

class count_class(BaseModel):
  count: int

class count_class_c(BaseModel):
  keyword: bool

# openCV에서 이미지,영상 불러오는 함수
def video_streaming():
  return get_stream_video()

# openCV에서 이미지,영상 불러오는 함수
def video_streaming_C():
  return get_stream_video_C()

# 스트리밍 경로를 /video 경로로 설정
@app.get('/video')
def main1():
  # StringResponse함수를 return하고,
  # 인자로 OpenCV에서 가져온 "바이트"이미지와 type을 명시
  return StreamingResponse(video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")

# 스트리밍 경로를 /video 경로로 설정
@app.get('/videoc')
def main2():
  # StringResponse함수를 return하고,
  # 인자로 OpenCV에서 가져온 "바이트"이미지와 type을 명시
  return StreamingResponse(video_streaming_C(), media_type="multipart/x-mixed-replace; boundary=frame")

# 운동 시작시 리액트에서 카운트 초기화
@app.get('/initialization')
def counterInitialization():
  countlist.append(0)
  countlist_c.append(0)
  downCamera_C.append(0)
  return {'countlist':countlist, 'countlist_c':countlist_c}

@app.post('/execcategories')
def exec_categories1(exec: exec_categories):
  exec_category = exec.exec
  execList.append(exec_category)

@app.get('/videocount')
def countchecker():
  return {'count':countlist, 'squatFeedback':sqautFeedbackList, 
          'pushUpFeedback':pushUpFeedbackList, 'count_c':countlist_c, 
          'squatKneeFeedback':squatKneeFeedbackList,
          'squatShoulderFeedback': squatShoulderFeedbackList
          }

@app.post('/videoshutdown')
def shutdown(count: count_class):
  print('shutdown count', count.count)
  downCamera.append(count.count)
  print(downCamera)
  
@app.get('/camerachallengeshutdown')
def shutdownC():
  downCamera_C.append(1)
  return downCamera_C
  