class KlendathuInvasionError(Exception):
    def __init__(self, message):
        self.message = message
    # This is a hollow exception        

def deploy_troops(safe):
    if not safe:
        KlendathuInvasionError("Drop zone is hot!")  
        # Never thrown
    print("Troopers deployed.")

deploy_troops(False)