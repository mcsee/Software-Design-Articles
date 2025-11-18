plain
 ^(recipients 
	 inject: 'to: ' 
	 into: [:plainText :address | plainText, address ,' ,' ]) 
	   allButLast