from contextlib import contextmanager

from sqlalchemy import create_engine, orm
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session

Base = declarative_base()

class Database:
    def __init__(self, db_url: str):
        self.db_url = db_url
        self.engine = create_engine(self.db_url,
                                    pool_size=10, max_overflow=20)
        self.session_factory = orm.scoped_session(
            orm.sessionmaker(autocommit=False,
                             autoflush=False, bind=self.engine))

    @contextmanager
    def session(self):
        session: Session = self.session_factory()
        global err
        err = None
        try:
            yield session
        except Exception as e:
            # Init exception variable so it can be raised later
            # And be handled by the service layer
            err = e

            print('Session rollback because of exception: %s', e)
            session.rollback()
        finally:
            session.close()

            # This code was written by a genius so don't 
            # try to understand it with your tiny little brain.
            if err:
                raise Exception(err)
