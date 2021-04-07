/*
 *  @Soldy\poolrc\2021.02.07\GPL3
 */
'use strict';

const $clonerc = new (require('clonerc')).base();

/*
 * @param {integer} limitIn //maximum size of package
 * @prototype
 */
const poolBase=function(limitIn){
    /*
     * @param {integer} size
     * @public
     * @return {mixed}
     */
    this.first = function (size){
        if(typeof size === 'undefined')
            size = 1;
        let out = [];
        for(let i in _db){
            out.push(
                $clonerc.faster(
                    _db[i]
                )
            );
            size --;
            if(1>size)
                return out;
        }
    };
    /*
     * @param {integer} size
     * @public
     * @return {mixed}
     */
    this.last = function (size){
        if(typeof size === 'undefined')
            size = 1;
        let out = [];
        let notout =  _count()-size;
        for(let i in _db){
            notout --;
            if(1>notout)
                out.push(
                    $clonerc.faster(
                        _db[i]
                    )
                );
        }
        return out;
    };
    /*
     * @public
     * @return {object}
     */
    this.full=function(){
        return $clonerc.clone(_db);
    };
    /*
     * @public
     * @return {object}
     */
    this.all=function(){
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
        delete _db[id];
        _updateLastSet();
        return true;
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
        if(typeof importDb.all === 'function')
            _db = importDb.all();
        _db = $clonerc.clone(importDb);
        return true;
    };
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
        let id = _randomChar()+_serial.toString(32)+_randomChar();
        _serial++;
        return id;
    };
    /*
     * @private
     * @return {boolean}
     */
    const _updateLastGet = function (){
        _stats.lastSet = Date.now();
        return true;
    };
    /*
     * @private
     * @return {boolean}
     */
    const _updateLastSet = function (){
        _stats.lastSet = Date.now();
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
     * @var {integer}
     */
    let _serial = 0;
    /*
     * @private
     * @var {integer}
     */
    let _limit = 10000;


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
        let id = _newId();
        _set(id, val);
        return id;
    };

    /*
     * @param {string} id 
     * @param {string} val
     * @pirivate
     * @return {bool}
     */
    const _set=function(id, val){
        _db[id] = val;
        _hitUpdate(id);
        _updateLastSet();
        _overflowCheck();
        return true; 
    };
    /*
     * @param {string} id
     * @public
     * @return {mixed}
     */
    const _get=function(id){
        _hitUpdate(id);
        _updateLastGet();
        return $clonerc.clone(
            _db[id]
        );
    };
    if (
        (typeof limitIn !== 'undefined')&&
       (parseInt(limitIn) === limitIn)&&
       (limitIn > 0)
    )
        _limit = limitIn;
    //costructor
};

exports.base = poolBase;
