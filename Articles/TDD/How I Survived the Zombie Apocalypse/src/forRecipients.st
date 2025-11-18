forRecipients: recipients 

     self assertAllAddressesAreValid: recipients.
     self assertThereAreNoDuplicates: recipients.		 
    ^self new initializeForRecipients: recipients 