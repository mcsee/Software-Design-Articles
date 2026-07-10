forRecipients: recipients 

	recipients do: [:eachAddress | 
		eachAddress isString
			ifFalse: [ 
			   self error: (eachAddress , ' is not a valid recipient')] ].
		 
	^self new initializeForRecipients: recipients 