import datetime
import httpx

from webapp.repositories.airports_repository import AirportsRepository

from ..models import Airport, Flight, Ticket
from ..exceptions import *
from ..config import Settings


class FlightsRepository:
    def __init__(self, session_factory):
        self.session_factory = session_factory
        self.flights_repo: FlightsRepository = self
        self.airports_repository: AirportsRepository = AirportsRepository

        # Get external api url from .env file
        # to later call it in the get_flights_by_params method 
        global EXTERNAL_API_URL_01
        global EXTERNAL_API_KEY_01

        EXTERNAL_API_URL_01 = Settings().EXTERNAL_API_URL_01
        EXTERNAL_API_KEY_01 = Settings().EXTERNAL_API_KEY_01


    def delete_expired_local_flights(self) -> None:
        """
        Delete all flights from the database that expired (that already departured).

        Args:
            None

        Raises:
            None

        Returns:
            None
            (status_code = 204)
        """
        with self.session_factory() as s:
            # TODO: Add try, except
            # Get all flights that already departured
            rec: list = s.query(Flight).filter(Flight.departure_time < datetime.datetime.now()).all()
            
            # Delete all flights that already departured
            # TODO: Check if this is the best way to delete all flights
            for f in rec:
                # Check if there are any booked tickets for this flight
                if self.get_flight_tickets(f):
                    # If there are, delete them
                    for ticket in self.get_flight_tickets(f):
                        s.delete(ticket)
                        print('Deleting ticket...', ticket.id, ticket.flight_id)
                        s.commit()

                        # TOLOG: deleting ticket, ticket
                s.delete(f)
                print('Deleting from db...', f.id)



            # TOLOG: deleting flight, flight
            s.commit()

            if not rec:
                # TOLOG: same as the print below
                print('No flights to delete, skipping...')

            return rec

    def get_flight_tickets(self, flight_obj):
        """
        Get all tickets for a flight

        Args:
            flight_obj: The flight object

        Raises:
            None

        Returns:
            A list of all tickets for a flight
            (status_code = 200)
        """
        with self.session_factory() as s:
            # Get all tickets for a flight
            rec: list = s.query(Ticket).filter(Ticket.flight_id == flight_obj.id).all()

            return rec


    def is_internal_flights_in_db(self, origin_display_name: str, destination_display_name: str,
                                        departure_time) -> bool:
        """
        Check if there are any flight in our db that already match the requestsed params

        Args:
            - origin_display_name:      The airport's origin display name
            - destination_display_name: The airport's destination display name
            - departure_time:           The flight's deperture time

        Raises:
            None

        Returns:
            True if there are any flights in the database that match the requested params, False otherwise
            (status_code = 200)
        """
        from webapp.services import FlightsService

        # Get the origin and destination airport by their display_name
        with self.session_factory() as s:
            origin_airport      = s.query(Airport).filter(Airport.display_name == origin_display_name).first()
            destination_airport = s.query(Airport).filter(Airport.display_name == destination_display_name).first()

            rec = s.query(Flight).filter(
                                        Flight.origin_airport_id      == origin_airport.id,
                                        Flight.destination_airport_id == destination_airport.id,
                                        Flight.departure_time         >= departure_time
                                        ).all()

            flights_in_db = []

            for flight in rec:
                flights_in_db.append(FlightsService.serialize_flight(self, flight))

            if rec:
                print(flights_in_db)
                return flights_in_db
            else:
                return False


    def get_external_flights_by_params(self, origin_display_name: str, destination_display_name: str,
                                             departure_time:      str) -> list:
        """
        Get flights by paramaters from the external API

        Args:
            - origin_display_name:      The airport's origin display name
            - destination_display_name: The airport's destination display name
            - departure_time:           The flight's deperture time
        
        Raises:
            FlightNotFoundException: Something went wrong while getting the flights from the external api

        Returns:
            A list of all flights in the database
            (status_code = 200)
        """

        # Get the origin and destination airport by their display_name
        with self.session_factory() as s:
            origin_airport      = s.query(Airport).filter(Airport.display_name == origin_display_name).first()
            destination_airport = s.query(Airport).filter(Airport.display_name == destination_display_name).first()

            # TODO: Uncomment validation, commented for testing invalid airport name(s)
            # if origin_airport is None or destination_airport is None:
            #     raise AirportNotFoundException('Invalid airport name was provided, please double check your origin and destination airport display names.')

        # Send a request to the external api to get the flights
        external_flights = httpx.get(EXTERNAL_API_URL_01 + '/flightsFuture',
                                        params={'type': 'departure', 'date': departure_time, # limited to only a week from today
                                                'iataCode': origin_airport.airport_code,
                                                'arr_iataCode': destination_airport.airport_code,
                                                'key': EXTERNAL_API_KEY_01, 'limit': '60' # TODO: remove limit, only here for debug
                                                },
                                    )

        return external_flights.text

    def validate_display_names(self, origin_display_name: str, destination_display_name: str):        
        with self.session_factory() as s:
            rec = s.query(Airport).filter(Airport.display_name == origin_display_name).first()
            if not rec:
                raise AirportNotFoundException('No airport was found with the given origin display name!')
            
            rec = s.query(Airport).filter(Airport.display_name == destination_display_name).first()
            if not rec:
                raise AirportNotFoundException('No airport was found with the given destination display name!')



    def get(self, flights_id: int):
        """
        Get a flights from the database by ID

        Args:
            flights_id (int): The ID of the flights to get

        Raises:
            FlightNotFoundException: The requested flights doesn't exist

        Returns:
            The flights object that was requested
            (status_code = 200)
        """
        from webapp.services import FlightsService

        if not isinstance(flights_id, int):
            raise InvalidParamsException('The flights ID must be an integer!')

        with self.session_factory() as s:
            rec: Flight = s.query(Flight).filter(Flight.id == flights_id).first()
            
            if not rec:
                raise FlightNotFoundException(f"Flights #{flights_id} doesn't exist!")
            
            return FlightsService.serialize_flight(self, rec)


    def insert_external_flight(self, origin_airport_display_name: int, destination_airport_display_name: int, 
                               departure_date, arrival_date, airline_company, airline_company_code, price, tickets_quantity) -> Flight:
        """
        Insert flights to the database

        Args:
            origin_airport_id      (str):      The title of the flights
            destination_airport_id (str):      The description of the flights
            departure_time         (datetime): The price of the flights
            landing_time           (datetime): The quantity of the flights

        Raises:
            InvalidParametersWereProvidedInRequestException: Trying to add a flights with invalid parameters
            Exception: A general error occured while updating the flights

        Returns:
            The flights that was added to the database
            (status_code = 201)
        """
        from webapp.services import FlightsService

        with self.session_factory() as s:
            try:
                origin_airport = s.query(Airport).filter(Airport.display_name == origin_airport_display_name).first()
                destin_airport = s.query(Airport).filter(Airport.display_name == destination_airport_display_name).first()

                flight_to_add = Flight(origin_airport_id=origin_airport.id, 
                                        destination_airport_id=destin_airport.id,
                                        departure_time=departure_date,
                                        landing_time=arrival_date,
                                        airline_company=airline_company,
                                        airline_company_code=airline_company_code,
                                        remaining_tickets=tickets_quantity,
                                        ticket_economy_price=price,
                                        )

                # Add the flights to the database
                s.add(flight_to_add)
                s.commit()
                return FlightsService.serialize_flight(self, flight_to_add)

            except Exception as e:
                raise Exception('An error occured while adding the flights to the database! (500)', e)



    def update(self, flights_id: int, data: dict):
        """
        Update a flights from the database by ID

        Args:
            flights_id (int): The ID of the flights to update

        Raises:
            FlightNotFoundException: The flights doesn't exist
            InvalidParametersWereProvidedInRequestException: The user is trying to update the flights with invalid parameters
            InvalidParametersWereProvidedInRequestException: The flights ID is not a valid integer
            Exception: A general error occured while updating the flights
        
        Returns:
            The flights object that was sucessfully updated
            (status_code = 204)
        """
        if not isinstance(flights_id, int):
            raise InvalidParamsException('The flights ID must be an integer!')
        elif not isinstance(data, dict):
            raise InvalidParamsException('The data must be a dictionary!')

        with self.session_factory() as s:

            try:
                rec: Flight = s.query(Flight).filter(Flight.id == flights_id).first()

                if not rec:
                    raise FlightNotFoundException(f"The flights #{flights_id} doesn't exist!")

                # Check which flights fields were provided in 'data' and update them
                if 'title' in data:
                    rec.title = data['title']
                if 'desc' in data:
                    rec.desc = data['desc']
                if 'price' in data:
                    rec.price = data['price']
                if 'quantity' in data:
                    rec.quantity = data['quantity']
                
                # Update the flights after changing the flights's data
                s.commit()

            except InvalidParamsException as e:
                raise InvalidParamsException(str(e))
            except Exception as e:
                raise Exception('An error occured while updating the flights in the database!', e)


    def delete(self, flights_id: int):
        """
        Delete a flights from the database by ID
        
        Args:
            flights_id: The ID of the flights to delete

        Raises:
            FlightNotFoundException: The flights doesn't exist
            Exception: A general error occured while deleting the flights
            InvalidParametersWereProvidedInRequestException: The flights ID is not a valid integer

        Returns:
            No content
            (status_code = 204)
        """
        if not isinstance(flights_id, int):
            raise InvalidParamsException('The flights ID is not a valid integer!')

        with self.session_factory() as s:
            rec: Flight = s.query(Flight).filter(Flight.id == flights_id).first()

            if not rec:
                raise FlightNotFoundException(f"Flights #{flights_id} doesn't exist!")


            try:
                s.delete(rec)
                s.commit()
            except Exception as e:
                raise Exception('An error occured while deleting the flights from the database!', e)


    def modify_all(self, flights_to_update: list, flights_to_delete: list):
        with self.session_factory() as s:
            for f in flights_to_update:
                rec: Flight = s.query(Flight).filter(Flight.id == f['id']).first()

                if not rec:
                    raise FlightNotFoundException(f"Flights #{f['id']} doesn't exist!")

                rec.title    = f['title']
                rec.desc     = f['desc']
                rec.price    = f['price']
                rec.quantity = f['quantity']
                s.commit()

            for f in flights_to_delete:
                rec: Flight = s.query(Flight).filter(Flight.id == f).first()

                if not rec:
                    raise FlightNotFoundException(f"Flights #{f} doesn't exist!")

                s.delete(rec)
                s.commit()
