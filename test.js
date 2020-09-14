const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const poolrc = new (require('./index.js')).poolrc(100);

nanoTest.add(
    'check size',
    {
        'function':poolrc.size,
        'options':[]
    },
    '===',
    0
);

nanoTest.add(
    'check test set',
    {
        'function':poolrc.add,
        'options':['test1']
    },
    '===',
    'a0a'
);

nanoTest.add(
    'check test1 size',
    {
        'function':poolrc.size,
        'options':['']
    },
    '===',
    1
);

nanoTest.add(
    'check test all',
    {
        'function':poolrc.all
    },
    'j==',
    ['test1']
);


nanoTest.add(
    'check test full ',
    {
        'function':poolrc.full,
        'options':[]
    },
    'j==',
    {'a0a':'test1'}
);

nanoTest.add(
    'check del',
    {
        'function':poolrc.del,
        'options':['a0a']
    },
    '===',
    true
);

nanoTest.add(
    'check test1 check ',
    {
        'function':poolrc.check,
        'options':['test1']
    },
    '===',
    false 
);
nanoTest.run();
