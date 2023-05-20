# Code Smell 30 - Mocking Business

![Code Smell 30 - Mocking Business](Code%20Smell%2030%20-%20Mocking%20Business.jpg)

*Mocking is a great aid when testing behavior. Like with many other tools, we are abusing them.*

> TL;DR: Don't use Mocks

# Problems

- Complexity

- False safety sensation.

- Parallel objects (Real and Mocks)

- Maintainability

# Solutions

1. [Mock](https://en.wikipedia.org/wiki/Mock_object) just non-business entities.

2. Remove mock if its interface has too much behavior.
 
# Sample Code

## Wrong

[Gist Url]: # (https://gist.github.com/mcsee/191cee3a71132501564cdb58abef27a7)
```php
<?php

namespace phpUnitTutorial\Test;

use phpUnitTutorial\Payment;

class PaymentTest extends \PHPUnit_Framework_TestCase
{
    public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
    {
        $paymentDetails = array(
            'amount'   => 123.99,
            'card_num' => '4111-1111-1111-1111',
            'exp_date' => '03/2013',
        );
   
        $payment = $this->getMockBuilder('\Payment')
            ->setConstructorArgs(array())
            ->getMock();
        // We should not mock a business object

        $authorizeNet = new \AuthorizeNetAIM($payment::API_ID, $payment::TRANS_KEY);
        // This is an external and coupled system.
        // We have no control on it so tests might be fragile

        $result = $payment->processPayment($authorizeNet, $paymentDetails);

        $this->assertTrue($result);
    }
}
```

## Right

[Gist Url]: # (https://gist.github.com/mcsee/1a84f6cf33594a0b63f5171a13513439)
```php
<?php

namespace phpUnitTutorial\Test;

use phpUnitTutorial\Payment;

class PaymentTest extends \PHPUnit_Framework_TestCase
{
    public function testProcessPaymentReturnsTrueOnSuccessfulPayment()
    {
        $paymentDetails = array(
            'amount'   => 123.99,
            'card_num' => '4111-1111-1111-1111',
            'exp_date' => '03/2013',
        );

        $payment = new Payment();
        // Payment is a real one

        $response = new \stdClass();
        $response->approved = true;
        $response->transaction_id = 123;

        $authorizeNet = $this->getMockBuilder('\AuthorizeNetAIM')
            ->setConstructorArgs(array($payment::API_ID, $payment::TRANS_KEY))
            ->getMock();
        
        // External system is mocked

        $authorizeNet->expects($this->once())
            ->method('authorizeAndCapture')
            ->will($this->returnValue($response));

        $result = $payment->processPayment($authorizeNet, $paymentDetails);

        $this->assertTrue($result);
    }
}
```

# Detection

This is an architectural pattern. It will not be easy to create an automatic detection rule.

# Exceptions

- Mocking accidental problems (serialization, databases, APIs) is a very good practice to avoid coupling.

# Tags

- Abuser 

# Conclusion

Mocks, like many other test doubles are excellent tools. Choosing wisely when to use them is an art.

# Also Known as

- Faker

# More Info

[Mocking is a Code Smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a)

[Mocks aren't Stubs](https://martinfowler.com/articles/mocksArentStubs.html)

# Credits

Photo by [Syed Ahmad](https://unsplash.com/@syedabsarahmad) on [Unsplash](https://unsplash.com/s/photos/monkey)

* * *

> The pesticide paradox. Every method you use to prevent or find bugs leaves a residue of subtler bugs against which those methods are ineffective.

_Boris Beizer_

[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)