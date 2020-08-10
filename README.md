![logo](https://drawcall.github.io/ppo/docs/imgs/logo2.png)

## Overview

Every frontend developer has written his own utils library, and we often write methods that are easily forgotten and highly used. [ppo](https://drawcall.github.io/ppo/) is a super small and useful utils library for JavaScript. It and [lodash](https://github.com/lodash/lodash) [underscore](https://github.com/jashkenas/underscore) [lazy.js](https://github.com/dtao/lazy.js) almost no coupling.
I sorted out the most frequently used function functions in everyday development. These functions are almost ubiquitous in your development, and they are not found in lodash underscore.

Most of the code comes from the [stackoverflow](https://stackoverflow.com/) site in the high score answer, here to pay tribute to the original author.

ppo little poor, gzip less than **3k**, so a library you can use it anytime, anywhere without worrying about anything.

## Documentation

#### View the document please visit [https://drawcall.github.io/ppo/](https://drawcall.github.io/ppo/)

## Installation

#### Install using npm

[![anix](https://nodei.co/npm/ppo.png)](https://npmjs.org/package/ppo)

```shell
npm install ppo --save

...
import ppo from 'ppo';
```

#### Include in html

```html
<script type="text/javascript" src="js/ppo.min.js"></script>
```

## Usage

```javascript
import ppo from "ppo";

const username = ppo.getCookie("username");

if (ppo.isIOS()) console.log("this is ios");

ppo.loadjs('http://x.com/a.js', callback);

ppo.getUrlParam('a' ,'http://xxx.com?a=3&b=sd23s');

const id = ppo.setTimesout(word => { 
    console.log(word); 
    console.log(this);  // log {index: 3 ,times: 8, over: false}  
}, 1000/20, 8, 'helloworld')
```

## Why ppo?

When you use react, vue, angular often need to write a lot of utils method. But lodash and underscore these libraries are not omnipotent. So you have to find a lot of tool library. Use ppo, you can solve the daily development of many small problems. Simple and compact!

## Download

- [ppo.js](https://raw.githubusercontent.com/drawcall/ppo/master/ppo.js)
- [ppo.min.js](https://raw.githubusercontent.com/drawcall/ppo/master/ppo.min.js)

## License

ppo is released under the MIT License. http://www.opensource.org/licenses/mit-license
