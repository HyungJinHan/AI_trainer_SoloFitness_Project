from fastapi.responses import StreamingResponse
from exercise_main import get_stream_video
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services, schemas as _schemas
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = _fastapi.FastAPI()

origins = {
    "http://localhost",
    "http://localhost:3000",
}

app.add_middleware(
  CORSMiddleware,
  allow_origins = origins,
  allow_credentials = True,
  allow_methods = ["*"],
  allow_headers= ["*"],
)

@app.post('/api/users')
async def create_user(user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends(_services.get_db)):
  db_user = await _services.get_user_by_email(user.email, db)

  if db_user:
    raise _fastapi.HTTPException(status_code=400, detail='Email already in use')

  user = await _services.create_user(user, db)

  return await _services.create_token(user)

@app.post('/api/token')
async def generate_token(
  form_data: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
   db: _orm.Session = _fastapi.Depends(_services.get_db)
):
  user = await _services.authenticate_user(form_data.username, form_data.password, db)

  if not user:
    raise _fastapi.HTTPException(status_code=401, detail='Invalid Credentials')

  return await _services.create_token(user)

@app.get('/api/users/me', response_model=_schemas.User)
async def get_user(user: _schemas.User = _fastapi.Depends(_services.get_current_user)):
  return user

@app.post('/api/leads', response_model=_schemas.Lead)
async def create_lead(
  lead: _schemas.LeadCreate,
  user: _schemas.User=_fastapi.Depends(_services.get_current_user),
  db: _orm.Session=_fastapi.Depends(_services.get_db)
):
  return await _services.create_lead(user=user, db=db, lead=lead)

@app.get('/api/leads', response_model=List[_schemas.Lead])
async def get_leads(
  user: _schemas.User=_fastapi.Depends(_services.get_current_user),
  db: _orm.Session=_fastapi.Depends(_services.get_db)
):
  return await _services.get_leads(user=user, db=db)

@app.get('/api/leads/{lead_id}', status_code=200)
async def get_lead(
  lead_id: int,
  user: _schemas.User=_fastapi.Depends(_services.get_current_user),
  db: _orm.Session=_fastapi.Depends(_services.get_db)
):
  return await _services.get_lead(lead_id, user, db)

@app.delete('/api/leads/{lead_id}', status_code=204)
async def delete_lead(
  lead_id: int,
  user: _schemas.User=_fastapi.Depends(_services.get_current_user),
  db: _orm.Session=_fastapi.Depends(_services.get_db)
):
  await _services.delete_lead(lead_id, user, db)
  return {'message', 'Successfully Deleted'}

@app.put('/api/leads/{lead_id}', status_code=200)
async def update_lead(
  lead_id: int,
  lead: _schemas.LeadCreate,
  user: _schemas.User=_fastapi.Depends(_services.get_current_user),
  db: _orm.Session=_fastapi.Depends(_services.get_db)
):
  await _services.update_lead(lead_id, lead, user, db)
  return {'message', 'Successfully Updated'}

@app.get('/api')
async def root():
  return {'message': 'Awesome Leads Manager'}

# openCV에서 이미지,영상 불러오는 함수
def video_streaming():
    return get_stream_video()

# 스트리밍 경로를 /video 경로로 설정
@app.get('/video')
def main():
    # StringResponse함수를 return하고,
    # 인자로 OpenCV에서 가져온 "바이트"이미지와 type을 명시
    return StreamingResponse(video_streaming(), media_type="multipart/x-mixed-replace; boundary=frame")