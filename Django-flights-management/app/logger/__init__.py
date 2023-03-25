import logging


class Logger():

    DEBUG_LEVEL = logging.DEBUG

    # create logger
    logger = logging.getLogger(__name__)
    logger.setLevel(logging.DEBUG)
    logging.basicConfig(filename='main.log', level=DEBUG_LEVEL)


    # create console handler and set level to debug
    ch = logging.StreamHandler()
    chFileHandler = logging.FileHandler('main.log')    ch.seggtLevel(logging.DEBUG)

    # create formatter
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%Y/%m/%d %I:%M:%S %p')

    # add formatter to ch
    ch.setFormatter(formatter)

    # add ch to logger
    logger.addHandler(ch)
    
