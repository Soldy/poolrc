const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const poolrc = new (require('./index.js')).poolrc(100);

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
    'set',
    {
        'function':poolrc.add,
        'options':['test1']
    },
    '===',
    'a0a'
);

nanoTest.add(
    'size',
    {
        'function':poolrc.size,
        'options':['']
    },
    '===',
    1
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
    'all',
    {
        'function':poolrc.all
    },
    'j==',
    ['test1']
);


nanoTest.add(
    'full',
    {
        'function':poolrc.full,
        'options':[]
    },
    'j==',
    {'a0a':'test1'}
);

nanoTest.add(
    'del',
    {
        'function':poolrc.del,
        'options':['a0a']
    },
    '===',
    true
);

nanoTest.add(
    'check ',
    {
        'function':poolrc.check,
        'options':['test1']
    },
    '===',
    false 
);
nanoTest.run();
