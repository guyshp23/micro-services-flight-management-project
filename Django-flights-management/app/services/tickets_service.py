import logging

from app.exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from app.models import Ticket, Flight, Customer


class TicketService(BaseServiceInterface):
    global logger
    logger = logging.getLogger('main')
    
    def book_ticket(self, flight_id: int):
        """
        Creates a new ticket for the given flight (flight_id)
        for the customer that sent the request and returns the created ticket.
        
        Params:
            - flight_id: The flight ID.
        
        Raises:
            - ModelNotFoundException: If the flight with the given ID doesn't exist.
            - Exception: If a general error occurred in the flights service.

        Returns:
            - The ticket that was booked.
        """
        logger.debug("TicketService.book_ticket() called")
        
        # Check if the ticket exists by ID
        flight = Flight.objects.filter(id=flight_id).first()

        if flight == None:
            logger.error('Flight not found, id: ' + str(flight_id))
            raise ModelNotFoundException('Flight not found')
        
        # It's here because when creating a new ticket, it doens't
        # Accept a customer ID, it accepts a customer object.
        customer = Customer.objects.filter(id=1).first()

        # Create a new ticket for the flight, customer = current user
        # TODO: Get the current user ID by the token in the request
        ticket = Ticket.objects.create(flight=flight, customer=customer)
        ticket.save()

        logger.debug('Booked a new ticket: ' + str(ticket))
        return ticket
