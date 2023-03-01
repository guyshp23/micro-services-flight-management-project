from pydantic import BaseSettings


class Settings(BaseSettings):
    # API_KEY: str
    DB_CONNECTION: str
    EXTERNAL_API_URL_01: str
    EXTERNAL_API_KEY_01: str

# specify .env file location as Config attribute
    class Config:
        env_file = ".env"
