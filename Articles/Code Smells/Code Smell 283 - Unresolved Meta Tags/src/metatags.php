<?php

$emailBody = "Hello {user_name}, 
your order for {product_name} is confirmed.";

// You forget to make the replacements
sendEmail($emailBody); 