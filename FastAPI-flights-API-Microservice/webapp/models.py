from datetime import date, datetime
import json
from sqlalchemy import Column, ForeignKey, String, Integer, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from webapp.repositories.airports_repository import AirportsRepository
from .exceptions import InvalidParamsException


Base = declarative_base()

class Flight(Base):
    __tablename__ = "app_flight"

    id                     = Column(Integer, primary_key=True, auto_increment=True)
    origin_airport_id      = Column(ForeignKey('app_airport.id'))
    destination_airport_id = Column(ForeignKey('app_airport.id'))
    departure_time         = Column(DateTime)
    landing_time           = Column(DateTime)
    airline_company        = Column(String(50))
    airline_company_code   = Column(String(50))
    remaining_tickets      = Column(Integer)
    ticket_economy_price   = Column(Float)

    def __init__(self, origin_airport_id, destination_airport_id, departure_time, landing_time, airline_company, airline_company_code, remaining_tickets, ticket_economy_price):
        self.origin_airport_id      = origin_airport_id
        self.destination_airport_id = destination_airport_id
        self.departure_time         = departure_time
        self.landing_time           = landing_time
        self.airline_company        = airline_company
        self.airline_company_code   = airline_company_code
        self.remaining_tickets      = remaining_tickets
        self.ticket_economy_price   = ticket_economy_price

        self.validate()

    def serialize_time(self, obj):
        """
         JSON serializer for objects not serializable by default json code
         https://stackoverflow.com/a/22238613
        """

        if isinstance(obj, (datetime, date)):
            return obj.strftime("%d/%m/%Y %H:%M")
        raise TypeError ("Type %s not serializable" % type(obj))

    def validate(self):
        return True


class Airport(Base):
    __tablename__ = "app_airport"

    id           = Column(Integer, primary_key=True, auto_increment=True)
    country_name = Column(String(50))
    city_name    = Column(String(50))
    airport_name = Column(String(50))
    airport_code = Column(String(3))
    display_name = Column(String(50))   

    def __init__(self, id, name, city):
        self.id   = id
        self.name = name
        self.city = city

        self.validate()

    def to_dict(self):
        return {
            "object": "Airport",
            "data": {
                "id"   : self.id,
                "name" : self.name,
                "city" : self.city,
            }
        }

    def validate(self):
        return True

class Ticket(Base):
    __tablename__ = "app_ticket"

    id          = Column(Integer, primary_key=True, auto_increment=True)
    customer_id = Column(ForeignKey('app_customer.id'))
    flight_id   = Column(ForeignKey('app_flight.id'))
