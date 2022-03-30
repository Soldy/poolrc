'use strict';
const fs = require('fs');
const nanoTest  = new (require('nanoTest')).test({
    'progress_bar' : false,
    'debug_print'  : 'short'
});
const poolrc = new (require('./index.js')).base({
    'limit': 100,
    'file' : 'test.setup.backup'
});
const second = new (require('./index.js')).base({
    'limit': 100,
    'file' : 'test.setup.backup'
});
let _new_id = '';
nanoTest.add(
    'size',
    {
        'function':poolrc.size,
        'options':[]
    },
    '===',
    0
);

nanoTest.add(
    'empty',
    {
        'function':poolrc.empty,
        'options':[]
    },
    '===',
    true
);

nanoTest.add(
    'add',
    {
        'function': async function(v){
            _new_id = await poolrc.add(v);
            return _new_id;
        },
        'options':['test1']
    },
    '!==',
    false
);
nanoTest.add(
    'last',
    {
        'function': poolrc.last,
        'options':[]
    },
    '===',
    'test1'
);
nanoTest.add(
    'first',
    {
        'function': poolrc.first,
        'options':[]
    },
    '===',
    'test1'
);
nanoTest.add(
    'refit',
    {
        'function': poolrc.refit,
        'options':[]
    },
    '!==',
    false
);


nanoTest.add(
    'check ',
    {
        'function':function(){
             return poolrc.check(_new_id);
         },
        'options':[]
    },
    '===',
    true
);


nanoTest.add(
    'get',
    {
        'function':function(){
             return poolrc.get(_new_id);
         },
        'options':[]
    },
    '===',
    'test1'
);


nanoTest.add(
    'set',
    {
        'function': poolrc.set,
        'options':['test','test2']
    },
    '!==',
    false
);

nanoTest.add(
    'get',
    {
        'function': poolrc.get,
        'options':['test']
    },
    '===',
    'test2'
);
nanoTest.add(
    'last',
    {
        'function': poolrc.last,
        'options':[]
    },
    '===',
    'test2'
);
nanoTest.add(
    'first',
    {
        'function': poolrc.first,
        'options':[]
    },
    '===',
    'test1'
);

nanoTest.add(
    'size',
    {
        'function':poolrc.size,
        'options':['']
    },
    '===',
    2 
);

nanoTest.add(
    'stats',
    {
        'function':poolrc.stats,
        'options':['']
    },
    '!==',
    false
);

nanoTest.add(
    'empty',
    {
        'function':poolrc.empty,
        'options':[]
    },
    '===',
    false
);

nanoTest.add(
    'list',
    {
        'function':poolrc.list
    },
    '!==',
    false
);

 
nanoTest.add(
    'all',
    {
        'function':poolrc.all
    },
    'j==',
    ['test1','test2']
);


nanoTest.add(
    'full',
    {
        'function':poolrc.full,
        'options':[]
    },
    '!==',
    false
);

nanoTest.add(
    'save',
    {
        'function':poolrc.save,
        'options':['test.backup']
    },
    '!==',
    false
);
nanoTest.add(
    'load',
    {
        'function':second.load,
        'options':['test.backup']
    },
    '!==',
    false
);


nanoTest.add(
    'del',
    {
        'function':poolrc.del,
        'options':[_new_id]
    },
    '===',
    false

);

nanoTest.add(
    'check ',
    {
        'function':second.check,
        'options':[_new_id]
    },
    '===',
    false 
);
nanoTest.add(
    'last',
    {
        'function':second.last,
        'options':[]
    },
    '===',
    'test2'
);
nanoTest.add(
    'set',
    {
        'function': poolrc.set,
        'options':['test','test_3']
    },
    '!==',
    false
);
nanoTest.add(
    'save',
    {
        'function':poolrc.save,
        'options':[]
    },
    '!==',
    false
);
nanoTest.add(
    'load',
    {
        'function':second.load,
        'options':[]
    },
    '!==',
    false
);

nanoTest.add(
    'get second',
    {
        'function':second.get,
        'options':['test']
    },
    '===',
    'test_3'
);




nanoTest.add(
    'delete backup file',
    {
        'function':async function(){
           await fs.unlinkSync('test.backup');
           return true;
        },
        'options':[]
    },
    '!==',
    false
);

nanoTest.add(
    'delete backup file',
    {
        'function':async function(){
           await fs.unlinkSync('test.setup.backup');
           return true;
        },
        'options':[]
    },
    '!==',
    false
);

nanoTest.run();
