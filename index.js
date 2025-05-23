/*
 *  @Soldy\poolrc\2021.02.07\GPL3
 */
'use strict';

const fs = require('node:fs/promises');
const $setuprc = require('setuprc').base;
const $clonerc = new (require('clonerc')).base();

/*
 * @param {integer} limitIn //maximum size of package
 * @prototype
 */
const poolBase=function(settings){
    /*
     * @public
     * @return {mixed}
     */
    this.first = function (){
        return _first();
    };
    /*
     * @public
     * @return {mixed}
     */
    this.last = function (){
        return _last();
    };
    /*
     * @public
     */
    this.refit=function(){
        _db = _full();
        return true;
    }
    /*
     * @public
     * @return {object}
     */
    this.full=function(){
        return _full();
    };
    /*
     * @public
     * @return {object}
     */
    this.all=function(){
        return _all();
    };
    /*
     * @public
     * @return {object}
     */
    this.list=function(){
        let list = [];
        for (let i in _db)
            list.push(_db[i]);
        return list;
    };
    /*
     * @param {string} id
     * @public
     * @return {mixed}
     */
    this.get=function(id){
        if(typeof id !== 'string')
            return false;
        if(typeof _db[id] === 'undefined')
            return undefined;
        return _get(id);
    };
    /*
     * @param {string} val
     * @public
     * @return {string}
     */
    this.add=function(val){
        if(typeof val === 'undefined')
            return false;
        return _add(val);
    };
    /*
     * @param {string} id 
     * @param {string} val
     * @public
     * @return {string}
     */
    this.set=function(id, val){
        if(typeof id === 'undefined')
            return false;
        if(typeof val === 'undefined')
            return false;
        return _set(id, val);
    };
    /*
     * @param {string} id 
     * @param {string} val
     * @public
     * @return {string}
     */
    this.edit=function(id, val){
        if(typeof id === 'undefined')
            return false;
        if(typeof val === 'undefined')
            return false;
        if(typeof _db[id] === 'undefined')
            return false;
        _db[id] = val;
        _updateLastSet();
        return true; 
    };
    /*
     * @param {string} id
     * @public
     * @return {boolean}
     */
    this.del=function(id){
        if(typeof id !== 'string')
            return false;
        if(typeof _db[id] === 'undefined')
            return false;
        return _del(id);
    };
    /*
     * @param {string}- id
     * @public
     * @return {boolean}
     */
    this.check=function(id){
        if(
            (typeof id !== 'string') ||
            (typeof _db[id] === 'undefined')
        )
            return false;
        return true;
    };
    /*
     * @public
     * @return {boolean}
     */
    this.empty=function(){
        if( 0 === parseInt(_count()))
            return true;
        return false;
    };
    /*
     * @public
     * @return integer
     */
    this.size=function(){
        return _count();
    };
    /*
     * @public
     * @return {object}
     */
    this.stats=function(){
        _count();
        return _stats;
    };
    /*
     * @public
     * @return {void}
     */
    this.drop=function(){
        _drop();
    };
    /*
     * @param {object}
     * @public
     * @return {boolean}
     */
    this.importing = function(importDb){
        if(typeof importDb.full === 'function')
            _db = importDb.full();
        _db = $clonerc.clone(importDb);
        return true;
    };
    /*
     * @param {string} file
     * @private
     * @return {object}
     */
    this.load = async function(file){
        if(typeof file === 'undefined')
            file = _setup.get('file');
        if(typeof file === 'undefined')
            return false;
        return await _load(file);
    }
    /*
     * @param {string} file
     * @private
     * @return {object}
     */
    this.save = async function(file){
        if(typeof file === 'undefined')
            file = _setup.get('file');
        if(typeof file === 'undefined')
            return false;
        return await _save(file);
    }
    /*
     * @private
     * @return {string}
     */
    const _randomChar=function(){
        return Math.floor(
            Math.random()*36
        ).toString(36);
    };
    /*
     * @private
     * @return {string}
     */
    const _newId = function (){
        const id = (
            _randomChar()+
            _serial.toString(32)+
            _randomChar()
        ).toString();
        _serial++;
        return id;
    };
    /*
     * @private
     * @return {boolean}
     */
    const _updateLastGet = function (id){
        _stats.lastGet = Date.now();
        _track_last_get[id] = parseInt(_stats.lastGet);
        return true;
    };
    /*
     * @private
     * @return {boolean}
     */
    const _updateLastSet = function (id){
        _stats.lastSet = Date.now();
        _track_last_set[id] = parseInt(_stats.lastSet);
        return true;
    };
    /*
     * @private
     * @return {integer}
     */ 
    const _count = function (){
        if(_stats.lastCount > _stats.lastSet)
            return _stats.count;
        let out = 0;
        let index = 0;
        for(let i in _db){
            out++;
            index+=i.length;
        }
        _stats.count     = out;
        _stats.index     = index;
        _stats.bytes     = JSON.stringify(_db).toString().length;
        _stats.lastCount = Date.now();
        return out;
    };
    /*
     * @private
     * @var {dictonary}
     *
     */
    let _db_hits = {};
    let _init_stamp = Date.now();
    /*
     * @private
     * @var {dictonary}
     *
     */
    let _stats = {
        count:0,
        bytes:0,
        index:0,
        start:parseInt(_init_stamp),
        lastSet:parseInt(_init_stamp),
        lastGet:parseInt(_init_stamp),
        lastCount:parseInt(_init_stamp)
    };
    /*
     * @private
     * @return {boolean}
     */
    const _overflowCheck = function (){
        if(_limit === 0)
            return true;
        let size = _count();
        if (_limit > size)
            return true;
        let overdo = size - _limit;
        for(let i in _db){
            delete _db[i];
            overdo--;
            if(1>overdo)
                return true;
        }
    };
    /*
     * @private
     * @return {void}
     */
    const _drop = function () {
        _db = {};
    };
    /*
     * @private
     * @var {dictonary}
     */
    let _db = {};
    /*
     * @private
     * @var {dictonary}
     */
    let _track_last_set = {};
    /*
     * @private
     * @var {dictonary}
     */
    let _track_last_get = {};
    /*
     * @private
     * @var {integer}
     */
    let _serial = 0;
    /*
     * @private
     * @var {boolean}
     */
     let _timeout_check = false;
    /*
     * @private
     * @var {integer}
     */
     let _timeout = 0;
    /*
     * @private
     * @var {integer}
     */
    let _limit = 10000;
    /*
     *  @private
     *  @const {object}
     */
    const _setup_json = {
        'limit':{
            'type'    : 'integer',
            'default' : 10000
        },
        'timeout':{
            'type'    : 'integer',
            'default' : 3600
        },
        'timeout_check':{
            'type'    : 'boolean',
            'default' : false
        },
        'file' : {
            'type'    : 'string',
            'default' : 'poolrc.jsonplr'
        }
    };
    /*
     *  @private
     *  @const {setuprc}
     */
    const _setup = new $setuprc(
        _setup_json
    );
    /*
     * @param {string} id
     * @pirivate
     */
    const _hitUpdate = function(id){
        const now = Math.round(Date.now()/1000);
        if(typeof _db_hits[id] === 'undefined'){
            _db_hits[id] = {
                first : parseInt(now),
                last  : parseInt(now),
                hit   : 0
            };
        }else{
            _db_hits[id].last = now;
            _db_hits[id].hit++;
        }
    };
    /*
     * @param {string} val
     * @public
     * @return {string}
     */
    const _add=function(val){
        const  id = _newId();
        _set(id, val);
        return id.toString();
    };

    /*
     * @param {string} id 
     * @param {string} val
     * @pirivate
     * @return {bool}
     */
    const _set=function(id, val){
        _db[id.toString()] = $clonerc.clone(val);
        _hitUpdate(id);
        _updateLastSet(id);
        _overflowCheck();
        return true; 
    };
    /*
     * @param {string} id
     * @public
     * @return {mixed}
     */
    const _get=function(id){
        if(_timeout_check)
            if(_timeoutCheck(id))
                return undefined;
        _hitUpdate(id);
        _updateLastGet(id);
        return $clonerc.clone(
            _db[id]
        );
    };
    /*
     * @private
     * @return {mixed}
     */
    const _first = function (){
        for(let i in _db){
            return $clonerc.clone(
                _db[i]
            );
        }
    };
    /*
     * @private
     * @return {mixed}
     */
    const _last = function (){
        let notout =  _count();
        for(let i in _db){
            notout --;
            if(1>notout)
                return $clonerc.clone(
                    _db[i]
                );
        }
    };
    /*
     * @param {string} id
     * @private
     * @return {mixed}
     */
    const _del=function(id){
        delete _db[id];
        if(typeof _track_last_get[id] !== 'undefined')
            delete _track_last_get[id];
        if(typeof _track_last_set[id] !== 'undefined')
            delete _track_last_set[id];
        return true;
    };
    /*
     * @param {string} id
     * @private
     * @return {mixed}
     */
    const _timeoutCheck=function(id){
        if(
            ((Date.now() -_track_last_set[id]) > _timeout)&&
            ( 
                (typeof _track_last_get[id] === 'undefined') ||
                ((Date.now() -_track_last_get[id]) > _timeout)

            )
        )
            return _del(id);
        return false;
    };
    /*
     * @private
     * @return {object}
     */
    const _full=function(){
        let db = {};
        for (let i in _db)
            db[i]=$clonerc.clone(
                _db[i]
            );
        return db;
    };
    /*
     * @private
     * @return {object}
     */
    const _list=function(){
        let list = [];
        for (let i in _db)
            list.push(
                $clonerc.clone(
                    i
                )
            );
        return list;
    };
    /*
     * @private
     * @return {object}
     */
    const _all=function(){
        let list = [];
        for (let i in _db)
            list.push(
                $clonerc.clone(
                    _db[i]
                )
            );
        return list;
    };
    /*
     * @param {string} file
     * @private
     * @return {object}
     */
    const _load = async function(file){
        _db = JSON.parse(await fs.readFile(
             file,
            'utf8'
        ));
        return true;

    };
    /*
     * @param {string} file
     * @private
     * @return {object}
     */
    const _save = async function(file){
        let out = true;
        await fs.writeFile(
            file,
            JSON.stringify(
                _full()
            )
        );
        return out;
    };
    //costructor
    if (
        (typeof settings === 'number')&&
        (Number.isInteger(settings))&&
        (settings > 0)
    ){
        _limit = settings;
    }else if ( typeof settings !== 'undefined' ){
        _setup.setup(settings);
        _limit = _setup.get('limit');
        _timeout = _setup.get('timeout');
        _timeout_check = _setup.get('timeout_check');
    }

};

exports.base = poolBase;
