import datetime as _dt
import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import database as _database

class User(_database.Base):
  __tablename__ = 'users'
  id = _sql.Column(_sql.Integer, primary_key=True, index=True)
  email = _sql.Column(_sql.VARCHAR(255), unique=True, index=True)
  hashed_password = _sql.Column(_sql.VARCHAR(255))

  leads = _orm.relationship('Lead', back_populates='owner')

  def verify_password(self, password: str):
    return _hash.bcrypt.verify(password, self.hashed_password)

class Lead(_database.Base):
  # mysql의 경우 String, VARCHAR 등 숫자를 지정해줘야 테이블 생성 가능
  __tablename__ = 'leads'
  id = _sql.Column(_sql.Integer, primary_key=True, index=True)
  owner_id = _sql.Column(_sql.Integer, _sql.ForeignKey('users.id'))
  first_name = _sql.Column(_sql.VARCHAR(255), index=True)
  last_name = _sql.Column(_sql.VARCHAR(255), index=True)
  email = _sql.Column(_sql.VARCHAR(255), index=True)
  company = _sql.Column(_sql.VARCHAR(255), index=True, default='')
  note = _sql.Column(_sql.VARCHAR(255), default='')
  date_created = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)
  date_last_updated = _sql.Column(_sql.DateTime, default=_dt.datetime.utcnow)

  owner = _orm.relationship('User', back_populates='leads')