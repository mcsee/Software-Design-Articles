# 5 Big Mistakes I Made Writing Technical Articles

![5 Big Mistakes I Made Writing Technical Articles](5%20Big%20Mistakes%20I%20Made%20Writing%20Technical%20Articles.gif)

*... and how to avoid them.*

> TL;DR: Read your articles on a mobile device.

Today @[Davide Bellone](@davidebellone) mentioned one of my articles on Twitter.

[Twitter](https://twitter.com/1392135734518325249)

I frequently read my articles again and make small adjustments. 

To my surprise, The [AMP](https://en.wikipedia.org/wiki/Accelerated_Mobile_Pages) version of my article was impossible to read.

## Headers

![Screenshot](https://cdn.hashnode.com/res/hashnode/image/upload/v1620854438007/S-8dBu4IL.png)

## Embedded Non-Canonical URLs and YouTube Articles

![Screenshot 2](https://cdn.hashnode.com/res/hashnode/image/upload/v1620854445492/xbz-VkNCi.png)

## Missing Code Samples

![Screenshot 3](https://cdn.hashnode.com/res/hashnode/image/upload/v1620854453712/xIzNmzo2C.png)

## We cannot Read Code on a Device

![Screenshot 4](https://cdn.hashnode.com/res/hashnode/image/upload/v1620854461473/yt7kXsGkm.png)

It is a pity. I do a lot of research on my articles, and they look like a mess.

# The Solutions

Let's find and correct the 5 more important problems.

## 1 - Preview the article in [AMP](https://en.wikipedia.org/wiki/Accelerated_Mobile_Pages) Mode
 
This is the original article:

[How to Get Rid of Annoying IFs Forever](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

1 - You can preview any web page on all major browsers like [Chrome](https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome), Firefox, Safari, or Edge.

2 - Fetch your amp equivalent page with [Google's tool](https://search.google.com/test/amp?id=iRVzmdIi-MkPWBlmvYGr3w).

3 - If the site supports amp as an alternate browser (like @[Hashnode](@hashnode) does) you can open it even on your desktop and play around with your drafts.

[Desktop Version](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/How%20to%20Get%20Rid%20of%20Annoying%20IFs%20Forever/readme.md)

[AMP Version](https://maximilianocontieri/amp/how-to-get-rid-of-annoying-ifs-forever)

## 2 - Embed the code

I use [gists](https://gist.github.com/) in all my articles because I can run them in an IDE and I sometimes change the examples. Gist is also very good for cross-posting since it keeps all articles synchronized. 

Readability is a must. From now on I will update all my articles embedding the code as plain text. 

I will keep gist for control version, but not for embedding.

Try reading this:

[Gist Url]: # (https://gist.github.com/mcsee/49382a7cff708d0b4a8c2e602295484f)
```javascript
movie.rate.warnIfNotAllowed(this.age);
```

against this:

```
movie.rate.warnIfNotAllowed(this.age);  
``` 

Which is better?

*I Use markdown comments to keep track of the code*

```
[//]: # (https://gist.github.com/mcsee/ab050467c32205a1b8623352f6bb8dd8)
``` 

## 3 - Use Alt Text whenever possible

This is a YouTube embed

[![Watch the video](https://img.youtube.com/vi/z43bmaMwagI/sddefault.jpg)](https://youtu.be/z43bmaMwagI) 

and this is what you see on an AMP page:

**https://www.youtube.com/watch?v=z43bmaMwagI**

a much better link would be 

[If considered harmful: How to eradicate 95% of all your bugs in one simple step - Jules May](https://www.youtube.com/watch?v=z43bmaMwagI)

Readers might even save the video for later watching if the title is interesting enough.

## 4 - Pay Special Attention to Images

Images drive a lot of traffic to your site. Even if you use them in a metaphorical way.

If you use [Google Search Console](https://search.google.com/search-console) you can try 
adding a filter:

```
"Search Type: Image"
``` 

If you add *Alt description* to all your images you will bring searches to your articles both from the content AND from the image descriptions you choose!

Remember to describe the image's intent, not what the actual image does.

![Advantages and Disadvantage of using the Singleton Pattern](https://cdn.hashnode.com/res/hashnode/image/upload/v1620862898080/Advantages%20and%20Disadvantage%20of%20using%20the%20Singleton%20Pattern.png)

Bad

```
![drawisland](https://cdn.hashnode.com/res/hashnode/image/upload/v1620862898080/Advantages%20and%20Disadvantage%20of%20using%20the%20Singleton%20Pattern.png)
``` 

```
![Singleton](https://cdn.hashnode.com/res/hashnode/image/upload/v1620862898080/Advantages%20and%20Disadvantage%20of%20using%20the%20Singleton%20Pattern.png)
``` 

Good 
```
![Advantages and Disadvantage of using the Singleton Pattern](https://cdn.hashnode.com/res/hashnode/image/upload/v1620862898080/Advantages%20and%20Disadvantage%20of%20using%20the%20Singleton%20Pattern.png)
``` 

## 5 - Replace links with your canonical ones

The article referenced all hashnode posts I wrote *before* customizing my domain.

So I replaced links like:

```
https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md
```

with my vanity ones:

```
https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/Coupling%20-%20The%20one%20and%20only%20software%20design%20problem/readme.md
```

They are better for SEO and personal branding.

## Bonus

As always, remember to check your articles with [Grammarly](https://app.grammarly.com/) and [HemmingwayApp](https://hemingwayapp.com/).

# To wrap up

After applying all these recipes to the original article we can see it is much easier to read!

![This amp version is better](https://cdn.hashnode.com/res/hashnode/image/upload/v1620865583754/n6PF7SX1o.png)

![This amp version shows embedded code](https://cdn.hashnode.com/res/hashnode/image/upload/v1620865591896/xJKaO6ySO.png)
