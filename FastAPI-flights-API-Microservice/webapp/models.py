from datetime import date, datetime
import json
from sqlalchemy import Column, String, Integer, DateTime, Float
from sqlalchemy.ext.declarative import declarative_base
from .exceptions import InvalidParametersWereProvidedInRequestException


Base = declarative_base()

class Flights(Base):
    __tablename__ = "app_flight"

    id                  = Column(Integer, primary_key=True, auto_increment=True)
    origin_airport      = Column(String)
    destination_airport = Column(String)
    departure_time      = Column(DateTime)
    arrival_time        = Column(DateTime)
    remaining_tickets   = Column(Integer)
    price               = Column(Float)

    def __init__(self, id, origin_airport, destination_airport, departure_time, arrival_time, remaining_tickets, price,):
        self.id                  = id
        self.origin_airport      = origin_airport
        self.destination_airport = destination_airport
        self.departure_time      = departure_time
        self.arrival_time        = arrival_time 
        self.remaining_tickets   = remaining_tickets
        self.price               = price

        self.validate()

    def json_serial(obj):
        """
         JSON serializer for objects not serializable by default json code
         https://stackoverflow.com/a/22238613
        """

        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        raise TypeError ("Type %s not serializable" % type(obj))

    # Used as a serializer to turn it from a python object to a json object
    # So it can be returned in the response
    def to_json(self):
        return {
            "object": "Flight",
            "data": {
                "id"                 : self.id,
                "original_airport"   : self.origin_airport,
                "destination_airport": self.destination_airport,
                "departure_time "    : self.departure_time,
                "arrival_time "      : self.arrival_time,
                "remaining_tickets"  : self.remaining_tickets,
                "price"              : self.price,
            }
        }


    def validate(self):
        return True
