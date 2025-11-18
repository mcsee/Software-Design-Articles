test07SimpleScenarios

  self assert: 
    (EmailMessage forRecipients:
	  (Array with: 'john@example.com')) plain = 'to: john@example.com'