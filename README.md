# PPO


## Overview

Every frontend developer has written his own utils library, and we often encapsulate methods that are often forgotten and easy to forget. ppo is a utility-belt library for JavaScript. It and lodash underscore lazy.js almost no coupling.
I sorted out the most frequently used function functions in everyday development. These functions are almost ubiquitous in your development, and they are not found in lodash underscore. Most of the code comes from the stackoverflow site in the high score answer, here to pay tribute to the original author.


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