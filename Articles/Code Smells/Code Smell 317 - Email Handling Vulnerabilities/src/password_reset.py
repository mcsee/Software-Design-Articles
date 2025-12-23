def reset_password(email_from_ui):
    # email_from_ui = "victim@gmàil.com" 
    # (attacker's Unicode address from UI)
    
    # Database with utf8mb4_unicode_ci collation
    # treats 'à' = 'a', so this query finds:
    # victim@gmail.com stored in the database
    cursor.execute(
        "SELECT * FROM users WHERE email = %s",
        (email_from_ui,)
    )
    user = cursor.fetchone()
    
    if user:
        # CRITICAL MISTAKE: Trusting UI data
        # Sends email to the attacker's Unicode address
        # instead of using user['email'] from DB
        send_reset_email(email_from_ui)
        # Should use: send_reset_email(user['email'])
        return True
    return False

# Attack scenario:
# DB stores: victim@gmail.com (ASCII, legitimate)
# Attacker controls: attacker@gmàil.com (Unicode)
# Attacker requests reset with: victim@gmàil.com
# Collation matches the victim's account
# Email sent to: victim@gmàil.com (attacker's address!)