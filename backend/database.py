import os
import sqlalchemy as _sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as _orm
from dotenv import load_dotenv
import pymysql

pymysql.install_as_MySQLdb()
# mysql 사용을 위한 설정 (pymysql 설치 필요)

load_dotenv()
# 지우면 오류

DB_USERNAME : str = os.getenv("DB_USERNAME")
DB_PASSWORD : str = os.getenv("DB_PASSWORD")
DB_HOST : str = os.getenv("DB_HOST")
DB_PORT : str = os.getenv("DB_PORT")
DB_DATABASE : str = os.getenv("DB_DATABASE")

DATABASE_URL = f"mysql://{DB_USERNAME}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_DATABASE}"

# DB_URL : str = os.getenv("DB_URL")

# DATABASE_URL = f"{DB_URL}"

engine = _sql.create_engine(DATABASE_URL)

SessionLocal = _orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = _declarative.declarative_base()