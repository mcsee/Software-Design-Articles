import logging

logger logging.getLogger(__name___)
try:
  send_email()
except ConnectionError as exception:
  logger.error("Can't send email {exception}")