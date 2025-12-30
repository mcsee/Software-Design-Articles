# This authentication module hasn't changed in 3 years
# It's deprecated and will be removed next quarter
# But you spend a week "improving" it

class LegacyAuthenticator:
    def authenticate(self, user, pwd):
        # Original messy code from 2019
        if user != None:
            if pwd != None:
                if len(pwd) > 5:
                    # Complex nested logic...
                    result = self.check_db(user, pwd)
                    if result == True:
                        return True
                    else:
                        return False
        return False

# After your "refactoring" (that nobody asked for):
class LegacyAuthenticator:
    def authenticate(self, user: str, pwd: str) -> bool:
        if not self._is_valid_input(user, pwd):
            return False
        return self._verify_credentials(user, pwd)
    
    def _is_valid_input(self, user: str, pwd: str) -> bool:
        return user and pwd and len(pwd) > 5
    
    def _verify_credentials(self, user: str, pwd: str) -> bool:
        return self.check_db(user, pwd)

# Meanwhile, the actively developed payment module
# (modified 47 times this month) remains a mess