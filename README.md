[![Build Status](https://travis-ci.org/Soldy/poolrc.svg?branch=master)](https://travis-ci.org/Soldy/poolrc)

# poolrc (poolrt  pool real challange)

The poolrc data pooling tool for science projects


##init

```javascript

const poolManager = new (require('./index.js')).poolrtBase()

```


## add data pool


```javascript
poolManager.set(
    id,
    data
);

```


## get data 


```javascript

poolManager.get({
    id
});


``` 
