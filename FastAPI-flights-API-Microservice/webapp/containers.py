from dependency_injector import containers, providers

from .database import Database
from .repositories.flights_repository import FlightsRepository
from .repositories.airports_repository import AirportsRepository

from .services import FlightsService


class Container(containers.DeclarativeContainer):
    config = providers.Configuration()

    db = providers.Singleton(Database, db_url=config.db.url)

    flights_repository = providers.Factory(
        FlightsRepository,
        session_factory=db.provided.session
    )

    airports_repository = providers.Factory(
        AirportsRepository,
        session_factory=db.provided.session
    )
    
    flights_service = providers.Factory(
        FlightsService,
        flights_repository=flights_repository,
        airports_repository=airports_repository
    )


