# 3.2 Identifying the Essence of Your Objects
            
![3.2 Identifying the Essence of Your Objects](3.2%20Identifying%20the%20Essence%20of%20Your%20Objects.png)

*Identifying the Essence of Your Objects*

> TL;DR: Identifying the Essence of Your Objects

<!-- [Gist Url](https://gist.github.com/mcsee/7c1ee7181f403225470c90c2f4668f99) -->

```javascript
const date = new Date();
date.setMonth(4);
```

<!-- [Gist Url](https://gist.github.com/mcsee/4dba037ac97bb8cf1e77caed469347a1) -->

```javascript
const date = new ImmutableDate("2022-03-25");

// The date essence is identified 
// and you will never change it from now on
```