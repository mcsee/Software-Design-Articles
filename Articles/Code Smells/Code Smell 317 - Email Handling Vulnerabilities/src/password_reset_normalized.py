import unicodedata

def normalize_email(email):
    # Convert to NFKC normalized form
    normalized = unicodedata.normalize('NFKC', email)
    
    # Ensure only ASCII characters
    try:
        normalized.encode('ascii')
    except UnicodeEncodeError:
        raise ValueError(
            "Email contains non-ASCII characters."
        )
    
    return normalized.lower()

def reset_password(email_from_ui):
    # DEFENSE 1: Normalize and validate input
    try:
        normalized_email = normalize_email(email_from_ui)
    except ValueError:
        # Reject non-ASCII emails immediately
        return False
    
    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (normalized_email,)
    )
    user = cursor.fetchone()
    
    if user:
        # DEFENSE 2: NEVER trust UI data
        # Always use the canonical email from the database
        database_email = user['email']
        send_reset_email(database_email)
        # NOT: send_reset_email(email_from_ui)
        # NOT: send_reset_email(normalized_email)
        return True
    return False

# Now the attack fails:
# Attacker sends: victim@gmàil.com
# Normalized to: rejected (non-ASCII)
# Even if it passed, email sent to: user['email']
# (the actual stored value, not the attacker's input)