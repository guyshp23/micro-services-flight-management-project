import logging


class Logger():

    DEBUG_LEVEL = logging.DEBUG

    # create logger
    logger = logging.getLogger('main')
    logger.setLevel(DEBUG_LEVEL)
    logging.basicConfig(filename='main.log', level=DEBUG_LEVEL)


    # create console handler and set level to debug
    ch = logging.StreamHandler()
    ch.setLevel(DEBUG_LEVEL)

    # create formatter
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s', datefmt='%Y/%m/%d %I:%M:%S %p')

    # add formatter to ch
    ch.setFormatter(formatter)

    # add ch to logger
    logger.addHandler(ch)
