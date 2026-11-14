from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from app import config

# URL.create safely handles special characters in the password
db_url = URL.create(
    drivername="mysql+pymysql",
    username=config.DB_USER,
    password=config.DB_PASSWORD,
    host=config.DB_HOST,
    port=config.DB_PORT,
    database=config.DB_NAME,
)

# The engine keeps a POOL of reusable connections.
engine = create_engine(
    db_url,
    pool_size=5,         # connections kept open
    max_overflow=10,     # extra connections allowed under heavy load
    pool_pre_ping=True,  # checks a connection is alive before using it
)