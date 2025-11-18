test02OneRecipient

  self assert: 
	(EmailMessage forRecipients: 
	  (Array with: 'john@example.com')) isValid.
  self assert: 
    (EmailMessage forRecipients:
	  (Array with: 'john@example.com')) plain =
	    'to: john@example.com'.