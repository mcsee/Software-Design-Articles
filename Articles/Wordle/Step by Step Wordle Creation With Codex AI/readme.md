# Step by Step Wordle Creation With Codex AI
            
![Step by Step Wordle Creation With Codex AI](Step%20by%20Step%20Wordle%20Creation%20With%20Codex%20AI.png)

*I transcribe the instructions to create a working wordle using natural language*

> TL;DR: How to create a Wordle without programming

A few months ago, I watched a video (in Spanish) about creating a Wordle using AI.

[![Watch the video](https://img.youtube.com/vi/FQqwynsDs7A/sddefault.jpg)](https://youtu.be/FQqwynsDs7A) 

The video used OpenAI Codex to create a [Wordle](https://www.nytimes.com/games/wordle/index.html).

It was developed by its amazing host [Carlos Santana](https://twitter.com/DotCSV).

If you can understand Spanish I suggest you [subscribe](https://www.youtube.com/c/DotCSV) to learn amazing things.

I had previously written an article on how to write a Wordle using TDD in January.

[How to Develop a Wordle Game using TDD in 25 Minutes](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/How%20to%20Develop%20a%20Wordle%20Game%20using%20TDD%20in%2025%20Minutes/readme.md)

I decided to replicate it and take my conclusions.

So I followed the host's same instructions (translating them to English and adding my comments).

You can follow this step-by-step tutorial on the Codex Playground site.

It is a pity Carlos's amazing tutorial is in Spanish, and English-speaking people miss it.

I will translate his steps into English.

# Step by Step Creation

## 0. Setup

Go to [Opean AI Site](https://beta.openai.com/)

Create an account if you hadn't done yet.

(You might have to wait for access for a couple of days).

GoTo [Codex Javascript Sandbox](https://beta.openai.com/codex-javascript-sandbox)

![Sandbox](https://cdn.hashnode.com/res/hashnode/image/upload/v1661906574999/it6rHUWQX.png)

## 1. First instruction (UI?)

`
/* create a table with 6 rows and 5 columns */
`

Output

[Gist Url]: # (https://gist.github.com/mcsee/654fa142e7020610fd62c2dffc9db6a6)
```javascript
/* create a table with 6 rows and 5 columns */

var table = document.createElement('table');
table.setAttribute('border','1');
for (var i = 0; i < 6; i++) {
  var row = document.createElement('tr');
  for (var j = 0; j < 5; j++) {
    var cell = document.createElement('td');
    cell.innerHTML = '<b>' + (i * 5 + j) + '</b>';
    row.appendChild(cell);
  }
  table.appendChild(row);
}
document.body.appendChild(table);
```
 
![step 1](https://cdn.hashnode.com/res/hashnode/image/upload/v1661989268994/rVWmfFysb.PNG)

> This was unexpected.

> A table is not an HTML Table.

> Both the author and Javascript code generator think about visual elements.

> What is more, variables have very bad names like [i and j](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/What%20exactly%20is%20a%20name%20-%20Part%20I%20The%20Quest/readme.md)

> We started with an [abbreviation code smell](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Code%20Smells/Code%20Smell%2033%20-%20Abbreviations/readme.md).

## 2. Cells styling (UI)

`
/* Cells are grey, squared of 80px 80px */
`

[Gist Url]: # (https://gist.github.com/mcsee/f57b037a11d7d86504ec87835aaade4c)
```javascript
/* Cells are grey, squared of 80px 80px */

var cells = table.getElementsByTagName('td');
for (var i = 0; i < cells.length; i++) {
  cells[i].style.backgroundColor = '#ccc';
  cells[i].style.width = '80px';
  cells[i].style.height = '80px';
}
```

![step 2](https://cdn.hashnode.com/res/hashnode/image/upload/v1661989673473/CKdUIZ8HE.PNG)

> Moving on with accidental UI style definition, the generator stylized the cells

## 3. Cells are half size (UI)

`
/* cells are half size */
`

[Gist Url]: # (https://gist.github.com/mcsee/be3acb12333af3537d6f0cb10a247fe8)
```javascript
/* cells are half size */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.width = '40px';
  cells[i].style.height = '40px';
}
```

![step 3](https://cdn.hashnode.com/res/hashnode/image/upload/v1661990003297/_liWyS1Hf.PNG)

> Impressive. It has context and is aware meaning of *halving*.

## 4. No table borders (UI)

`
/* there are no borders */
`

[Gist Url]: # (https://gist.github.com/mcsee/c5e48c2ce3868ccf0b27e6de6749667e)
```javascript
/* there are no borders */

table.style.border = 'none';
```

![step4](https://cdn.hashnode.com/res/hashnode/image/upload/v1661990455664/1-ed8PVWq.PNG)

## 5. Cells have no border (UI)

`
/* Cells have no border */
`

[Gist Url]: # (https://gist.github.com/mcsee/721bb457df66172ee20db0128a46b686)
```javascript
/* Cells have no border */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.border = 'none';
}
```

![step 5](https://cdn.hashnode.com/res/hashnode/image/upload/v1661990612281/avkYSDHiq.PNG)

> Notice we have 5 steps and we have no idea what is a Wordle, we are just playing around with the User Interface.

## 6. Text is centered (UI)

`
/* text is centered */
`

[Gist Url]: # (https://gist.github.com/mcsee/f501bf82876cb741c19da4e7a0b9a59a)
```javascript
/* Text is centered */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.textAlign = 'center';
}
```

![step 6](https://cdn.hashnode.com/res/hashnode/image/upload/v1661991116046/xeYjIq39B.PNG)

## 7. Text is white (UI)

`
/* text is white*/
`

[Gist Url]: # (https://gist.github.com/mcsee/52734cbd26ab3462cd6d9e705b2b8c80)
```javascript
/* text is white */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.color = 'white';
}
```

![step 7](https://cdn.hashnode.com/res/hashnode/image/upload/v1661991564064/xWEtdP2sq.PNG)

## 8. Text Styling (UI)

`
/* text is font Helvetica and bold */
`

[Gist Url]: # (https://gist.github.com/mcsee/95fcdd17d93b26abd5994c067f0d818c)
```javascript
/* text is font Helvetica and bold */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.fontFamily = 'Helvetica';
  cells[i].style.fontWeight = 'bold';
}
```

> Seriously? No actual game yet?

![step 8](https://cdn.hashnode.com/res/hashnode/image/upload/v1661992023249/1XNu25mLz.PNG)

## 9. Cells have no padding (UI)

`
/*  Cells have no padding */
`

[Gist Url]: # (https://gist.github.com/mcsee/d6d091bfbec50d2f800fddcb01b9af57)
```javascript
/* cells have no padding */

for (var i = 0; i < cells.length; i++) {
  cells[i].style.padding = '0px';
}
```

![step 9](https://cdn.hashnode.com/res/hashnode/image/upload/v1661992579211/Xfsq_d03O.PNG)

## 10. Cells are empty (UI/Model)

`
/* cells are empty */
`

[Gist Url]: # (https://gist.github.com/mcsee/7d7963651a00331766843a61d6a999fd)
```javascript
/* cells are empty */

for (var i = 0; i < cells.length; i++) {
  cells[i].innerHTML = '';
}
```

![step 10](https://cdn.hashnode.com/res/hashnode/image/upload/v1661992912968/V0hTUATN0.PNG)

> Following Carlos's Instructions, we arrived at a ready-to-use User Interface.

> No tests, no business rules. yet.

## 11. Add an input field (UI/Model)

`
/* add an input text field under the table */
`

[Gist Url]: # (https://gist.github.com/mcsee/ddf74c760a838a2803889f8d0138e4fd)
```javascript
/* add an input text field under the table */

var input = document.createElement('input');
input.setAttribute('type','text');
input.setAttribute('placeholder','Write Something');
document.body.appendChild(input);
```

![step 11](https://cdn.hashnode.com/res/hashnode/image/upload/v1661993633075/VTBpK0d0a.PNG)

## 12. Style the input field (UI)

`
/* add margin reduce text field width to 100px */
`

[Gist Url]: # (https://gist.github.com/mcsee/67657a613a82dbe42e888f1d63f80b61)
```javascript
/* add margin reduce text field width to 100px */

input.style.margin = '10px';
input.style.width = '100px';
```

![step 12](https://cdn.hashnode.com/res/hashnode/image/upload/v1661994567177/vl6g-4sEC.PNG)

## 13. Add validator with id (Model)

`
/* add a button by the field with the 'tick' character. The button must have an id named 'validate' */
`

[Gist Url]: # (https://gist.github.com/mcsee/21932f36905040772ae706275224a255)
```javascript
/*add a button by the field with the 'tick' character. The Button must have un id named 'validate' */

var button = document.createElement('button');
button.innerHTML = '&#10003;';
button.id = 'validate';
document.body.appendChild(button);
```

> We think ahead knowing we will need an accidental and implementation id.

> It is fine. As Carlos comments in his video, we need to think a bit as programmers.

![step 13](https://cdn.hashnode.com/res/hashnode/image/upload/v1661995696444/GBrARWGyV.PNG)

> We are creating a button with a special identifier since we *guess* it might be useful later.

## 14. Add remover button with another id (Model)

`
/* add another button with id 'remove' and the 'x' character as label */
`

[Gist Url]: # (https://gist.github.com/mcsee/ea0aad9007a7256d531919269c955ad7)
```javascript
/* add another button with id 'remove' and the 'x' character as label */

var button = document.createElement('button');
button.innerHTML = '&#10007;';
button.id = 'remove';
document.body.appendChild(button);
```

![step 14](https://cdn.hashnode.com/res/hashnode/image/upload/v1661995961579/66YmEkpdO.PNG)

## 15. Center box text (UI)

`
/* Center box text */
`

[Gist Url]: # (https://gist.github.com/mcsee/313f6630fb44b5895670e60f7b40de88)
```javascript
/* center box text */

input.style.textAlign = 'center';
```

![step 15](https://cdn.hashnode.com/res/hashnode/image/upload/v1661997699172/eRFf9jz39.PNG)

## 16. Limit the text size (UI/Model)

`
/* we cannot write more than 5 characters in the input field */
`

[Gist Url]: # (https://gist.github.com/mcsee/cd7e2b1f324f77af0382f80e44cd143f)
```javascript
/* we cannot write more than 5 characters in the input field */

input.setAttribute('maxlength','5');
```

![step 16](https://cdn.hashnode.com/res/hashnode/image/upload/v1661997881033/JvhEIbzMD.PNG)

## 17. We need to store the current attempt (Model)

`
/* create variable named 'rowIndex' starting at 0 */
`

[Gist Url]: # (https://gist.github.com/mcsee/05d172be13a1567c5aacb31aa4ba534c)
```javascript
/* create variable named 'rowIndex' starting at 0 */

var rowIndex = 0;
```

![step 17](https://cdn.hashnode.com/res/hashnode/image/upload/v1662000081196/n7x0f7zEt.PNG)

> This is when black magic comes in. 

> We need to think ahead.

> There's surely a better place to program a wordle. Stay tuned!

## 18. Text in uppercase (Model)

`
/* when entering text in the box, convert it to uppercase */
`

[Gist Url]: # (https://gist.github.com/mcsee/6b147fb8d1c2c2921c2235e2c007ab5c)
```javascript
/* when entering text in the box, convert it to uppercase */

input.addEventListener('keyup', function(event) { 
  event.target.value = event.target.value.toUpperCase();
});
```

![step 18](https://cdn.hashnode.com/res/hashnode/image/upload/v1662003605005/aupkgQ0Wr.PNG)

## 19. We went ahead of time (...)

> We need to rephrase the following instruction several times until we get the desired behavior.

> We have immediate feedback, so we are happy. 

## 20. Input text should be displayed on the cells (Model/UI)

`
/* after writing on the text field, the value from every character will be written on each cell of the selected row */
`

[Gist Url]: # (https://gist.github.com/mcsee/4e3ddf5a94c2edfb30db38ca42354ffc)
```javascript
/* after writing on the text field,
the value from every character will be writen
on each cell of the selected row */

input.addEventListener('keyup', function(event) {
  var text = event.target.value;
  var cells = document.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
      cells[i].innerHTML = text.charAt(i - rowIndex * 5);
    }
  }
});
```

![step 20](https://cdn.hashnode.com/res/hashnode/image/upload/v1662001664164/Lc7pHWzES.PNG)

## 21. We choose our secret word (Model)

`
/* store in a variable the secret word 'PAPER' */
`

[Gist Url]: # (https://gist.github.com/mcsee/d11fc687ec48692f25d05b8871085c05)
```javascript
/* store in a variable the secret word 'PAPER' */

var secretWord = 'PAPER';
```

## 22. If the character matches, put yellow (Model/UI)

`
/* When clicking the 'validate' button, we need to check if the characters of the chosen row are included in the secret word. If they are, the cell should be marked as yellow */
`

[Gist Url]: # (https://gist.github.com/mcsee/af640d8630e75114a9ca79df77e339e7)
```javascript
/* When clicking validate button, 
we need to check if the characters of the chosen row
are included in the secret word. 
If they are, the cell should be marked as yellow (#edc953) */

document.getElementById('validate').addEventListener('click', function(event) { 
  var cells = document.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
      if (secretWord.indexOf(cells[i].innerHTML) >= 0) {
        cells[i].style.backgroundColor = '#edc953';
      }
    }
  }
});
```

## 23. If the character matches, then put green (Model/UI)

`
/* if character is in right position, cell should be in green (#a9e54e) */
`

[Gist Url]: # (https://gist.github.com/mcsee/30ed757a4f47754ae388ca21b49038a1)
```javascript
// Step 23

// if character is in right position, cell should be in green (#aedb95)

document.getElementById('validate').addEventListener('click', function(event) {
  for (var i = 0; i < cells.length; i++) {
    if (i >= rowIndex * 5 && i < (rowIndex + 1) * 5) {
      if (secretWord.charAt(i - rowIndex * 5) === cells[i].innerHTML) {
        cells[i].style.backgroundColor = '#aedb95';
      }
    }
  }
});
```

![step 23](https://cdn.hashnode.com/res/hashnode/image/upload/v1662331981459/v8ilNoMK1.PNG)

## 24. Moving to the next Row (Model)

`
/*when clicking validate button, rowIndex variable increases */
`

[Gist Url]: # (https://gist.github.com/mcsee/d3317770fac42bf071c9e3c02b199937)
```javascript
/* when clicking validate button, rowIndex variable increases */

document.getElementById('validate').addEventListener('click', function(event) {
  rowIndex++;
});
```

![step 24](https://cdn.hashnode.com/res/hashnode/image/upload/v1662002926438/HR6BPKA4c.PNG)

## 25. Erasing game (Model)

`
/* when clicking validate button, rowIndex variable increases */
`

[Gist Url]: # (https://gist.github.com/mcsee/1faf21999ce4802ada87459ccdee0d5b)
```javascript
// Step 25

// when pushing remove button, every letter is erased, rowIndex goes to 0 and all cells turn gray 

document.getElementById('remove').addEventListener('click', function(event) {
  var cells = document.querySelectorAll('td');
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerHTML = '';
    cells[i].style.backgroundColor = '#ccc';
  }
  rowIndex = 0;
});
```

## 26. Saving valid words (Model)

`
/* save a collection of the following words: tools, super, faker, catch, cried in uppercase */
`

[Gist Url]: # (https://gist.github.com/mcsee/1e1431aa247d973eede919f3133f40a1)
```javascript
// Step 26

/* save a collection of the following words: tools, super, faker, catch, cried in uppercase */

var words = ['TOOLS', 'SUPER', 'FAKER', 'CATCH', 'CRIED'];
```

## 27. Choosing a secret word (Model)

`
/* when pressing remove, chose randomly the secret word from the words collection */ 
`

[Gist Url]: # (https://gist.github.com/mcsee/5e20258f4bd55d742cb0c59f42770827)
```javascript
// Step 27

/* when pressing remove, chose randomly the secret word from the words collection */ 

document.getElementById('remove').addEventListener('click', function(event) {
  var randomIndex = Math.floor(Math.random() * words.length);
  secretWord = words[randomIndex];
});
```

# The End is near

Up to here, I stuck to Carlos's demo.

There are some missing functionalities:

-- Business rules:

- Game should start with a random word.

- Words outside the dictionary should be invalid. Therefore, words with lengths different than 5 will not be available.

- The end of the game when we win or lose.

- We need to use a real dictionary.

-- UI / UX:

- The on-screen keyboard.

- The letters flipping.

- After entering the world, the text box should be cleared.

-- Extra:

- Wordle sharing characters

⬛⬛⬛🟩🟩

🟨⬛⬛⬛⬛

⬛⬛⬛🟩🟩

⬛🟨🟨🟨⬛

🟩🟩🟩🟩🟩

- ... many more to come ...

# Conclusion

Of the 27 steps above, 22 are related to UI.

[The model](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Theory/The%20One%20and%20Only%20Software%20Design%20Principle/readme.md) might not survive many business changes.

Maybe the [TDD](https://github.com/mcsee/Software-Design-Articles/tree/main/Articles/Wordle/How%20to%20Develop%20a%20Wordle%20Game%20using%20TDD%20in%2025%20Minutes/readme.md) version does.

The technology is amazing.

We can build an entire User Interface providing natural language commands.

Stay tuned for Wordle evolution on the following articles.

* * *

# Credits

Image by [DALL-E](https://labs.openai.com/)

Original video [here](https://www.youtube.com/watch?v=FQqwynsDs7A)

Full Source code on GitHub [here](https://github.com/mcsee/wordle/blob/main/Open%20AI%20Codex%20from%20DotCSV/wordle.js).

Working version (not fully functional as mentioned above) [here](https://mcsee.github.io/wordle/DotCSV/index.html)

* * *

In the following articles, I will iterate this and the TDD version.

Subscribe to get the next articles, so you won't miss them.