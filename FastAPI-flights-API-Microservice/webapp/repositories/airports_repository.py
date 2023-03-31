from ..config import Settings

class AirportsRepository():
    def __init__(self, session_factory):
        self.session_factory = session_factory

        # Get external api url from .env file
        # to later call it in the get_flights_by_params method
        global EXTERNAL_API_URL_01
        global EXTERNAL_API_KEY_01

        EXTERNAL_API_URL_01 = Settings().EXTERNAL_API_URL_01
        EXTERNAL_API_KEY_01 = Settings().EXTERNAL_API_KEY_01


    def get_airport_details_by_id(self, airport_id: int):
        from webapp.models import Airport

        with self.session_factory() as session:
            airport = session.query(Airport).filter(Airport.id == airport_id).first()

            return airport
