import logging
from app.exceptions.invalid_params import InvalidParamsException
from app.exceptions.model_not_found import ModelNotFoundException
from .base_service_interface import BaseServiceInterface
from app.models import CanceledTickets, Ticket, Flight, Customer


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
        # TODO: Change to a customer ID by the auth request token
        customer = Customer.objects.filter(id=1).first()

        # Create a new ticket for the flight, customer = current user
        # TODO: Get the current user ID by the token in the request
        ticket = Ticket.objects.create(flight=flight, customer=customer)
        ticket.save()

        logger.debug('Booked a new ticket: ' + str(ticket))
        return ticket

    def cancel_ticket(self, ticket_id: int):
        """
        Cancel a ticket (used by customers).
        Deletes the ticket from the Tickets table and adds it to the CanceledTickets table.

        Params:
            - ticket_id: The ticket ID.

        Raises:
            - Exception: If a general error occurred in the flights service.
            - ModelNotFoundException: If the ticket was not found.
            - InvalidParamsException: If the given ticket ID is in an invalid format

        Returns:
            - True if the ticket was canceled successfully. An exception otherwise
        """
        # Check if the ticket exists by ID
        ticket = Ticket.objects.filter(id=ticket_id).first()
        ticket_flight   = ticket.flight
        ticket_customer = ticket.customer

        if ticket == None:
            raise ModelNotFoundException(f'Ticket not found by ID {ticket_id}')
        
        # Check if ticket is not an integer
        if not isinstance(ticket_id, int):
            raise InvalidParamsException(f'Ticket ID must be an integer')
        
        ticket.delete()

        # Create a new ticketi n the CanceledTickets table
        CanceledTickets.objects.create(flight=ticket_flight, customer=ticket_customer)

        # Return the ticket that was canceled.
        return True


    def delete_ticket(self, ticket_id: int):
        """
        Delete a ticket in the database (used by admins)

        Params:
            - ticket_id: The ticket ID.

        Raises:
            - ModelNotFoundException: If the ticket was not found.
            - Exception: If a general error occurred in the flights service.
            - InvalidParamsException: If the given ticket ID is in an invalid format

        Returns:
            - None (void)
        """
        ticket = Ticket.object.filter(id=ticket_id).first()

        if ticket == None:
            raise ModelNotFoundException(f'Ticket not found by ID {ticket_id}')
        
        ticket.delete()
