<?php

$emailBody = "Hello {user_name},
your order for {product_name} is confirmed.";

if (strpos($emailBody, '{') !== false) {
    throw new Exception(
        "Incomplete meta tags found in email body.");
}
sendEmail($emailBody);