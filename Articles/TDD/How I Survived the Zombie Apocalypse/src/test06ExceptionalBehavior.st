test06ExceptionalBehavior

  self
    should:
	  [EmailMessage 
	    forRecipients:
		   (Array with: 'john@example.com' with: 'john@example.com')]
	raise: Exception