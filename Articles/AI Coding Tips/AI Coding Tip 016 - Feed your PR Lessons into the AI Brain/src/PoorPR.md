Fixed the payment bug

[x] Fixed the null check
[x] Tests pass

```
 - if ($payment !== null) {
 -     $payment->process();
 - }
 + if ($payment !== null && $payment->isValid()) {
 +     $payment->process();
 + }
```

// No AI context. No prompt. No record of what failed first.
// The next agent reads this diff and learns nothing.