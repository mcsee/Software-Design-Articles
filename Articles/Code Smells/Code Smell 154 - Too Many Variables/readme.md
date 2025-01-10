# Code Smell 154 - Too Many Variables

![Code Smell 154 - Too Many Variables](Code%20Smell%20154%20-%20Too%20Many%20Variables.jpg)

*You debug code and see too many variables declared and active*

> TL;DR: Variables should be as local as possible

# Problems

- Readability

- Code Reuse

# Solutions

1. [Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

2. Remove unused variables

# Refactorings
 
[Refactoring 002 - Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md)

# Context

Our code should be dirty when programming and writing test cases fast.

After we have good coverage we need to refactor and reduce methods.

# Sample Code

## Wrong

<!-- [Gist Url](https://gist.github.com/mcsee/b3d04c90186e88bca3e3353af7c24284) -->

```php
<?php

function retrieveImagesFrom(array $imageUrls) {
  foreach ($imageUrls as $index => $imageFilename) {
    $imageName = $imageNames[$index];
    $fullImageName = $this->directory() . "\\" . $imageFilename;
    if (!file_exists($fullImageName)) {
      if (str_starts_with($imageFilename,
          'https://cdn.example.com/')) {
        $url = $imageFilename;
        // This variable duplication is not really necessary 
        // When you scope variables        
        $saveto= "c:\\temp"."\\".basename($imageFilename);
        $ch = curl_init ($url);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        $raw = curl_exec($ch);
        curl_close ($ch);
        if(file_exists($saveto)){
          unlink($saveto);
        }
        $fp = fopen($saveto,'x');
        fwrite($fp, $raw);
        fclose($fp);
        $sha1 = sha1_file($saveto);
        $found = false;
        $files = array_diff(
          scandir($this->directory()), 
          array('.', '..'));
        foreach ($files as $file){
          if ($sha1 == 
              sha1_file($this->directory()."\\".$file)) {
            $images[$imageName]['remote'] = $imageFilename;
            $images[$imageName]['local'] = $file;
            $imageFilename = $file;
            $found = true;
            // Iteration keeps going on even after you found it
          }
        }
        if (!$found){
          throw new \Exception('No image was found');
        }
        // Debugging at this point your context
        // is polluted with variables
        // from previous executions no longer needed
        // for example: the curl handler
      }
    }
  }
}
```

![variables](https://cdn.hashnode.com/res/hashnode/image/upload/v1656256026861/aBMdc9L_R.PNG)

## Right

<!-- [Gist Url](https://gist.github.com/mcsee/21117af327d700e359d1eccf2d45accc) -->

```php
<?

function retrieveImagesFrom(string imageUrls) {
  foreach ($imageUrls as $index => $imageFilename) {
    $imageName = $imageNames[$index];
    $fullImageName = $this->directory() . "\\" . $imageFilename;
    if (!file_exists($fullImageName)) {
        if ($this->isRemoteFileName($imageFilename)) {
            $temporaryFilename = 
              $this->temporaryLocalPlaceFor($imageFilename);
            $this->retrieveFileAndSaveIt(
              $imageFilename,
              $temporaryFilename);
            $localFileSha1 = sha1_file($temporaryFilename);
            list($found, $images, $imageFilename) = 
              $this->tryToFindFile(
                $localFileSha1, $imageFilename, $images, $imageName);
            if (!$found) {
                throw new Exception(
                  'File not found locally (' . $imageFilename 
                + ') Need to retrieve it and store it');
            }
        } else {
            throw new \Exception('Image does not exist on directory ' .
               $fullImageName);
        }
    }
```

# Detection

[X] Automatic 

Most Linters can suggest use for long methods.

This warning also hints us to break and scope our variables.

# Tags

- Bloaters

# Conclusion

[Extract Method](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Refactorings/Refactoring%20002%20-%20Extract%20Method/readme.md) is our best friend. 

We should use it a lot.

# Relations

[Code Smell 03 - Functions Are Too Long](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2003%20-%20Functions%20Are%20Too%20Long/readme.md)

[Code Smell 107 - Variables Reuse](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%20107%20-%20Variables%20Reuse/readme.md)

[Code Smell 62 - Flag Variables](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2062%20-%20Flag%20Variables/readme.md)

# Credits

Photo by [Dustan Woodhouse](https://unsplash.com/@dwoodhouse) on [Unsplash](https://unsplash.com/s/photos/polluted)  

* * *

> Temporary variables can be a problem. They are only useful within their own routine, and therefore they encourage long, complex routines.

_Martin Fowler_
 
[Software Engineering Great Quotes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Quotes/Software%20Engineering%20Great%20Quotes/readme.md)

* * *

This article is part of the CodeSmell Series.

[How to Find the Stinky Parts of your Code](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/How%20to%20Find%20the%20Stinky%20parts%20of%20your%20Code/readme.md)