const nanoTest  = new (require('nanoTest')).test({
    'debugPrint' : 'short'
});
const poolrc = new (require('./index.js')).base(100);
let newId = '';
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
        'function': function(v){
            newId = poolrc.add(v);
            return newId;
        },
        'options':['test1']
    },
    '!==',
    false
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
    ['test1']
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
    'del',
    {
        'function':poolrc.del,
        'options':[newId]
    },
    '===',
    false

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
