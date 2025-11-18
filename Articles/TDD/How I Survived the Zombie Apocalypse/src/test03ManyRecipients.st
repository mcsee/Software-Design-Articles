test03ManyRecipients

  | message |
  message := (EmailMessage forRecipients:
  (Array 
    with: 'john@example.com' 
    with: 'jane@example.com' 
    with: 'lucas@example.com')).

  self assert: message plain = 
	  'to: john@example.com,jane@example.com,lucas@example.com'.
  self assert: message isValid