from rest_framework.views  import APIView, Response
from app.exceptions.factory import ExceptionsFactory
from app.exceptions.invalid_params import InvalidParamsException
from app.exceptions.model_not_found import ModelNotFoundException
from app.serializer.tickets_serializer import TicketsSerializer
from app.services.tickets_service import TicketService


class BookTicket(APIView):
    """
    Book a ticket for a flight.

    Params:
        - flight_id: The flight ID.

    Raises:
        - Exception: If a general error occurred in the flights service.

    Returns:
        - The ticket that was booked.
    """
    serializer_class = TicketsSerializer

    def post(self, request, flight_id: int):
        try:
            ticket     = TicketService.book_ticket(self, flight_id)
            serializer = self.serializer_class(ticket)

            # Return the ticket that was booked.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            # Return the error message.
            return ExceptionsFactory.handle(e)


class CancelTicket(APIView):
    pass


class DeleteTicket(APIView):
    """
    Forcfuly delete a ticket (used by admins).

    Params:
        - ticket_id: The ticket ID.
    
    Raises:
        - Exception: If a general error occurred in the flights service.
        - ModelNotFoundException: If the ticket was not found.
        - InvalidParamsException: If the given ticket ID is in an invalid format

    Returns:
        - The ticket that was deleted.
    """
    serializer_class = TicketsSerializer

    def delete(self, request, ticket_id: int):
        try:
            ticket     = TicketService.delete_ticket(self, ticket_id)
            serializer = self.serializer_class(ticket)

            # Return the ticket that was deleted.
            return Response(serializer.data, status=200)
        except ModelNotFoundException as e:
            return ExceptionsFactory.handle(e)
        except InvalidParamsException as e:
            return ExceptionsFactory.handle(e)
        except Exception as e:
            return ExceptionsFactory.handle(e)
