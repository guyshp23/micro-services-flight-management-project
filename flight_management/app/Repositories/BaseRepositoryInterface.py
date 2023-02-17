from abc import ABC, abstractmethod

class BaseRepositoryInterface(ABC):
    
    @abstractmethod
    def get_by_id():
        pass

    @abstractmethod
    def get_all():
        pass

    @abstractmethod
    def create():
        pass

    @abstractmethod
    def update():
        pass

    @abstractmethod
    def create_all():
        pass

    @abstractmethod
    def delete():
        pass

    