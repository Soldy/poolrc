[![Build Status](https://travis-ci.org/Soldy/assertrc.svg?branch=master)](https://travis-ci.org/Soldy/assertrc)

# assertrc (assert real challange)

The assertrc is an alternative shorthanded assert collection.


##init

```javascript

const assertManager = new (require('./index.js')).assertBase();

```


## simple test

```javascript

assertManager.check(
    '1', // value
    `===`, // rule
    '1' // sample
);

```


## simple test upload


```javascript

assertManager.tests({
    'id':'value',
    'id2':'value2'
});


``` 
