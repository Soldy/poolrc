[![Build Status](https://travis-ci.org/Soldy/poolrc.svg?branch=master)](https://travis-ci.org/Soldy/poolrc)

# poolrc 

The poolrc is a data pooling tool for science projects


## init

```javascript

const poolManager = new (require('./index.js')).poolrtBase()

```


## add data to the pool


```javascript
let response = poolManager.add(
    data
);

// response {string} generated id

```

## add data to the pool with set


```javascript
let response = poolManager.set(
    name,
    data
);

// response {bool}

```

## get data from the pool


```javascript

poolManager.get({
    name
});


```


## check data exist the pool


```javascript

poolManager.check({
    name
});


```

## get all data from the pool


```javascript

poolManager.all();


```

## full data export from the pool


```javascript

poolManager.full();

// object 
```

## check exist  


```javascript

let response = poolManager.check(
    name
);

// boolean

```


## delete data from the pool


```javascript

poolManager.del(
    name
);


```

## drop all data from the pool


```javascript

let response = poolManager.drop();

// bool true

```
## empty check


```javascript

let response poolManager.empty();

// boolean

```


## size of the pool


```javascript

let response = poolManager.size();

// respone integer

```

