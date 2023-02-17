from pydantic import BaseSettings


class Settings(BaseSettings):
    # API_KEY: str
    DB_CONNECTION: str

# specify .env file location as Config attribute
    class Config:
        env_file = "FastAPI-flights-API-Microservice/.env"
