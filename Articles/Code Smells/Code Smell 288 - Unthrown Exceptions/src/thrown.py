class KlendathuInvasionError(Exception):
    def __init__(self, message):
        super().__init__(message)

def deploy_troops(safe):
    if not safe:
        raise Exception("Drop zone is hot!")
    # You throw the exception
    print("Troopers deployed.")

try:
    deploy_troops(False)
except KlendathuInvasionError as e:
    print(f"Abort mission: {e}")
    # You handle the exception