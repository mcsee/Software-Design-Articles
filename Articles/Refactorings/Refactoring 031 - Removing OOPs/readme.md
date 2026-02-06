# Refactoring 031 - Removing OOPs

![Refactoring 031 - Removing OOPs](Refactoring%20031%20-%20Removing%20OOPs.jpg)

*Give users help, not confusion*

> TL;DR: Replace vague error messages with specific, actionable feedback that helps users solve problems.

# Problems Addressed 😔

- User confusion and frustration
- No actionable guidance provided
- Technical jargon
- Poor [unhandled errors](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)
- Poor [UX](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)
- Poor error recovery
- Incomplete [error information](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20244%20-%20Incomplete%20Error%20information/readme.md)
- Decreased user trust
- Generic messaging
- Silent failures

# Related Code Smells 💨

[Code Smell 97 - Error Messages Without Empathy](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2097%20-%20Error%20Messages%20Without%20Empathy/readme.md)

[Code Smell 166 - Low-Level Errors on User Interface](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20166%20-%20Low-Level%20Errors%20on%20User%20Interface/readme.md)

[Code Smell 72 - Return Codes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2072%20-%20Return%20Codes/readme.md)

[Code Smell 26 - Exceptions Polluting](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2026%20-%20Exceptions%20Polluting/readme.md)

[Code Smell 132 - Exception Try Too Broad](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20132%20-%20Exception%20Try%20Too%20Broad/readme.md)

# Context 💬

Vague error messages like "Oops, something went wrong" are the ultimate sign of Error Messages without Empathy.

They represent a failure in the Bijection between the system's internal state and the user's mental model. 

When a system fails silently or with generic jargon, it abdicates its responsibility to guide the user, leading to frustration, loss of trust, and increased support costs.

When you remove creepy message like "OOPs", you transform technical failures into actionable conversations. 

Instead of hiding behind a generic curtain, the system identifies the specific problem—whether it's a missing field, a timeout, or a business rule violation—and provides a clear path forward.

This approach separates the technical logging (the "How" for developers) from the functional feedback (the "What" for users), ensuring that your software remains a helpful collaborator rather than a confusing black box.

# Steps 👣

1. Identify all generic error messages in your codebase that use terms like "Oops", "Something went wrong", or "An error occurred"
2. Replace generic messages with specific descriptions of what happened
3. Add actionable guidance telling users exactly what they can do to resolve the issue
4. Implement proper internal logging to capture technical details for developers
5. Add monitoring alerts to notify the development team when errors occur frequently

# Sample Code 💻

## Before  🚨

<!-- [Gist Url](https://gist.github.com/mcsee/f013d66121679aa736daa7900d3f3f40) -->

```javascript
function processPayment(paymentData) {
  try {
    // Too broad try catch  
    validatePayment(paymentData);
    chargeCard(paymentData);
    sendConfirmation(paymentData.email);
  } catch (error) {
    // Generic error message shown to user
    return {
      success: false,
      userMessage: "Oops! Something went wrong. Please try again.",
      error: error.message
    };
  }
}

function handleError(res, error) {
  // Exposing HTTP 500 to users
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message
  });
}
```

## After 👉

<!-- [Gist Url](https://gist.github.com/mcsee/360e2393f52ddc42ad6a7bc749419ddf) -->

```javascript
function processPayment(paymentData) {
  try {
    validatePayment(paymentData);
    // This catch is specific to payment validation
  } catch (error) {
    // 1. Identify all generic error messages in your codebase
    // that use terms like "Oops", "Something went wrong", 
    // or "An error occurred"    
    // 2. Replace generic messages 
    // with specific descriptions of what happened
    // 3. Add actionable guidance telling users 
    // exactly what they can do to resolve the issue
    // 4. Implement proper internal logging 
    // to capture technical details for developers
    logger.error('Payment validation failed', {
      userId: paymentData.userId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    // 5. Add monitoring alerts to notify 
    // the development team when errors occur frequently    
    alerting.notifyError('PAYMENT_VALIDATION_FAILED', error);
    if (error.code === 'INVALID_CARD') {
      return {
        success: false,
        userMessage: "Your card information" + 
        " appears to be incorrect." +
        "Please check your card number," + 
        " expiry date, and security code."
      };
    }
    return {
      success: false,
      userMessage: "There was a problem validating" +
      " your payment." +
      "Please try again or contact support."
    };
  }

  // You should break this long method
  // Using extract method
  try {
    chargeCard(paymentData);
  } catch (error) {
    logger.error('Card charging failed', {
      userId: paymentData.userId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    alerting.notifyError('CARD_CHARGING_FAILED', error);
    if (error.code === 'INSUFFICIENT_FUNDS') {
      return {
        success: false,
        userMessage: "Your payment couldn't be processed"+
        " due to insufficient funds. " +
        "Please use a different payment method" + 
        " or contact your bank."
      };
    }
    if (error.code === 'CARD_EXPIRED') {
      return {
        success: false,
        userMessage: "Your card has expired. " +
        "Please update your payment method with a current card."
      };
    }
    return {
      success: false,
      userMessage: "There was a problem processing your payment." +
      " Please try again or contact support."
    };
  }

  try {
    sendConfirmation(paymentData.email);
  } catch (error) {
    logger.error('Confirmation sending failed', {
      userId: paymentData.userId,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    alerting.notifyError('CONFIRMATION_FAILED', error);
    return {
      success: true,
      userMessage: "Payment processed successfully,"+
      " but we couldn't send the confirmation email." +
      " Please check your email address or contact support."
    };
  }

  return { success: true,
          userMessage: "Payment processed successfully." };
}
```

# Type 📝

[X] Manual

# Safety 🛡️

This refactoring changes the behavior and is safe if you keep logging and alerts active for debugging.

Avoid removing details needed by support teams.

The risk of breaking changes is low since you're improving existing error handling rather than changing core business logic.

# Why is the Code Better? ✨

You give users useful guidance instead of confusion.

You create a better user experience by providing clear, actionable feedback instead of confusing technical jargon.

Users understand what went wrong and know their next steps.

You separate concerns by keeping technical details in logs while showing business-friendly messages to users.

Your support team gets better debugging information through structured logging.

You can proactively address system issues through monitoring alerts before users report them.

You keep technical information away from them but still record it for faster issue resolution.

# How Does it Improve the Bijection? 🗺️

You keep a closer match between the real world and your model. Instead of vague "Oops" messages, your system speaks in clear terms that reflect actual events.

Error messages in the [real world](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20is%20(wrong%20with)%20software/readme.md) contain specific information about what went wrong and how to fix it.

A cashier doesn't say "Oops, something went wrong" when your card is declined - they tell you the specific issue and suggest solutions.

This refactoring aligns the software model with [Bijection](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) error communication patterns, making the system more intuitive and helpful for users.

# Limitations ⚠️

You must be careful not to expose sensitive system information that could help attackers.

Some errors may need to remain generic for security reasons (like authentication failures).

Additionally, creating specific error messages requires more development time and thorough testing of error scenarios.

# Tags 🏷️

- Exceptions

# Level 🔋

[X] Intermediate

# Related Refactorings 🔄

[Refactoring 014 - Remove IF](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20014%20-%20Remove%20IF/readme.md)

# Refactor with AI 🤖

> Suggested Prompt: 1. Identify all generic error messages in your codebase that use terms like "Oops", "Something went wrong", or "An error occurred" 2. Replace generic messages with specific descriptions of what happened 3. Add actionable guidance telling users exactly what they can do to resolve the issue 4. Implement proper internal logging to capture technical details for developers 5. Add monitoring alerts to notify the development team when errors occur frequently

| Without Proper Instructions    | With Specific Instructions |
| -------- | ------- |
| [ChatGPT](https://chat.openai.com/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [ChatGPT](https://chat.openai.com/?q=1.+Identify+all+generic+error+messages+in+your+codebase+that+use+terms+like+%22Oops%22%2C+%22Something+went+wrong%22%2C+or+%22An+error+occurred%22+2.+Replace+generic+messages+with+specific+descriptions+of+what+happened+3.+Add+actionable+guidance+telling+users+exactly+what+they+can+do+to+resolve+the+issue+4.+Implement+proper+internal+logging+to+capture+technical+details+for+developers+5.+Add+monitoring+alerts+to+notify+the+development+team+when+errors+occur+frequently%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Claude](https://claude.ai/new?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Claude](https://claude.ai/new?q=1.+Identify+all+generic+error+messages+in+your+codebase+that+use+terms+like+%22Oops%22%2C+%22Something+went+wrong%22%2C+or+%22An+error+occurred%22+2.+Replace+generic+messages+with+specific+descriptions+of+what+happened+3.+Add+actionable+guidance+telling+users+exactly+what+they+can+do+to+resolve+the+issue+4.+Implement+proper+internal+logging+to+capture+technical+details+for+developers+5.+Add+monitoring+alerts+to+notify+the+development+team+when+errors+occur+frequently%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Perplexity](https://www.perplexity.ai/?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Perplexity](https://www.perplexity.ai/?q=1.+Identify+all+generic+error+messages+in+your+codebase+that+use+terms+like+%22Oops%22%2C+%22Something+went+wrong%22%2C+or+%22An+error+occurred%22+2.+Replace+generic+messages+with+specific+descriptions+of+what+happened+3.+Add+actionable+guidance+telling+users+exactly+what+they+can+do+to+resolve+the+issue+4.+Implement+proper+internal+logging+to+capture+technical+details+for+developers+5.+Add+monitoring+alerts+to+notify+the+development+team+when+errors+occur+frequently%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [Copilot](https://www.bing.com/chat?showconv=1&sendquery=1&q=1.+Identify+all+generic+error+messages+in+your+codebase+that+use+terms+like+%22Oops%22%2C+%22Something+went+wrong%22%2C+or+%22An+error+occurred%22+2.+Replace+generic+messages+with+specific+descriptions+of+what+happened+3.+Add+actionable+guidance+telling+users+exactly+what+they+can+do+to+resolve+the+issue+4.+Implement+proper+internal+logging+to+capture+technical+details+for+developers+5.+Add+monitoring+alerts+to+notify+the+development+team+when+errors+occur+frequently%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [You](https://you.com/search?q=Correct+and+explain+this+code%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) | [You](https://you.com/search?q=1.+Identify+all+generic+error+messages+in+your+codebase+that+use+terms+like+%22Oops%22%2C+%22Something+went+wrong%22%2C+or+%22An+error+occurred%22+2.+Replace+generic+messages+with+specific+descriptions+of+what+happened+3.+Add+actionable+guidance+telling+users+exactly+what+they+can+do+to+resolve+the+issue+4.+Implement+proper+internal+logging+to+capture+technical+details+for+developers+5.+Add+monitoring+alerts+to+notify+the+development+team+when+errors+occur+frequently%3A+%60%60%60javascript%0D%0Afunction+processPayment%28paymentData%29+%7B%0D%0A++try+%7B%0D%0A++++%2F%2F+Too+broad+try+catch++%0D%0A++++validatePayment%28paymentData%29%3B%0D%0A++++chargeCard%28paymentData%29%3B%0D%0A++++sendConfirmation%28paymentData.email%29%3B%0D%0A++%7D+catch+%28error%29+%7B%0D%0A++++%2F%2F+Generic+error+message+shown+to+user%0D%0A++++return+%7B%0D%0A++++++success%3A+false%2C%0D%0A++++++userMessage%3A+%22Oops%21+Something+went+wrong.+Please+try+again.%22%2C%0D%0A++++++error%3A+error.message%0D%0A++++%7D%3B%0D%0A++%7D%0D%0A%7D%0D%0A%0D%0Afunction+handleError%28res%2C+error%29+%7B%0D%0A++%2F%2F+Exposing+HTTP+500+to+users%0D%0A++res.status%28500%29.json%28%7B%0D%0A++++message%3A+%22Internal+Server+Error%22%2C%0D%0A++++error%3A+error.message%0D%0A++%7D%29%3B%0D%0A%7D%0D%0A%60%60%60) |
| [Gemini](https://gemini.google.com/) | [Gemini](https://gemini.google.com/) | 
| [DeepSeek](https://chat.deepseek.com/) | [DeepSeek](https://chat.deepseek.com/) | 
| [Meta AI](https://www.meta.ai/chat) | [Meta AI](https://www.meta.ai/) | 
| [Grok](https://grok.com/) | [Grok](https://grok.com/) | 
| [Qwen](https://chat.qwen.ai/) | [Qwen](https://chat.qwen.ai/) | 

# See also 📚

[Fail Fast](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Fail%20Fast/readme.md)

[What's in a Good Error Message?](https://www.morling.dev/blog/whats-in-a-good-error-message/)

[Are you sure people get happy about your "Oops" error messages? Or does it lower their trust in your software?](https://ulrikapark.wordpress.com/2021/05/03/are-you-sure-people-get-happy-about-your-oops-error-messages-or-does-it-lower-their-trust-in-your-software/)

[Error Handling: A Guide to Preventing Unexpected Crashes](https://www.sonarsource.com/learn/error-handling-guide/)

# Credits 🙏

Image by [Ryan McGuire](https://pixabay.com/users/ryanmcguire-123690/) on [Pixabay](https://pixabay.com/)

* * * 

This article is part of the Refactoring Series.

[How to Improve Your Code With Easy Refactorings](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/How%20to%20Improve%20your%20Code%20With%20Easy%20Refactorings/readme.md)