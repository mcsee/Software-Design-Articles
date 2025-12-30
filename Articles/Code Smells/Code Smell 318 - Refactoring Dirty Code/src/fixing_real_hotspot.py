# You analyze git history first:
# git log --format=format: --name-only | 
# grep -E '\.py$' | sort | uniq -c | sort -rn

# Results show PaymentProcessor changed 47 times this month
# And it does not have good enough coverage
# LegacyAuthenticator: 0 changes in 3 years

# Focus on the actual hotspot:
class PaymentProcessor:
    # This gets modified constantly and is hard to change
    # REFACTOR THIS FIRST
    def process_payment(self, amount, card, user, promo_code,
                       installments, currency, gateway):
        # 500 lines of tangled logic here
        # Changed 47 times this month
        # Every change takes 2+ days due to complexity
        pass

# Ignore stable legacy code
# But you can use IA to cover existing functionality
# With acceptance tests validated by a human product owner

class LegacyAuthenticator:
    # Leave this ugly code alone
    # It works, it's stable, it's being deprecated
    # Your time is better spent elsewhere
    def authenticate(self, user, pwd):
        if user != None:
            if pwd != None:
                if len(pwd) > 5:
                    result = self.check_db(user, pwd)
                    if result == True:
                        return True
        return False