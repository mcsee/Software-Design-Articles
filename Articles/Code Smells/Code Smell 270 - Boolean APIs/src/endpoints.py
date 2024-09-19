# Instead of a single endpoint with a boolean flag:
def send_message(content, view_once = False):
    # Process message based on view_once flag
    pass

# Create separate endpoints:
def send_regular_message(content):
    # Process regular message
    pass

def send_view_once_message(content):
    # Process view once message with enhanced security
    pass