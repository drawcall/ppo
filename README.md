![logo](https://a-jie.github.io/ppo/docs/imgs/logo2.png)

## Overview

Every frontend developer has written his own utils library, and we often write methods that are easily forgotten and highly used. [ppo](https://a-jie.github.io/ppo/) is a super small and useful utils library for JavaScript. It and [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js) almost no coupling.
I sorted out the most frequently used function functions in everyday development. These functions are almost ubiquitous in your development, and they are not found in lodash underscore. 

Most of the code comes from the [stackoverflow](https://stackoverflow.com/) site in the high score answer, here to pay tribute to the original author.

ppo little poor, gzip less than **3k**, so a library you can use it anytime, anywhere without worrying about anything.

#### View the document please visit [https://a-jie.github.io/ppo/](https://a-jie.github.io/ppo/)

## Installation

#### Install using npm 
``` 
npm install ppo --save 
```

#### Include in html
``` 
<script type="text/javascript" src="js/ppo.min.js"></script> 
```


## Usage

#### Use es6 or Typescript
```
import ppo from 'ppo';
    
ppo.log('hello world!');
```

#### Use es5 or older
```
ppo.removeConsole();
```