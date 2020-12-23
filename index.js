'use strict';

/*
 * @param {integer} limitIn //maximum size of package
 * @prototype
 */
 
exports.poolrc=function(limitIn){
    /*
     * @param {integer} size
     * @public
     * @return {mixed}
     */
    this.first = function (size){
        if(typeof size === 'undefined')
            size = 1;
        let out = [];
        for(let i in db){
            out.push(db[i]);
            size --;
            if(1>size)
                break;

        }
        return out;
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
        let notout =  count()-size;
        for(let i in db){
            notout --;
            if(1>notout)
                out.push(db[i]);
        }
        return out;
    };
    /*
     * @public
     * @return {object}
     */
    this.full=function(){
        return db;
    };
    /*
     * @public
     * @return {object}
     */
    this.all=function(){
        let list = [];
        for (let i in db)
            list.push(db[i]);
        return list;
    };
    /*
     * @public
     * @return {object}
     */
    this.list=function(){
        let list = [];
        for (let i in db)
            list.push(i);
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
        if(typeof db[id] === 'undefined')
            return undefined;
        return get(id);
    };
    /*
     * @param {string} val
     * @public
     * @return {string}
     */
    this.add=function(val){
        if(typeof val === 'undefined')
            return false;
        return add(val);
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
        return set(id, val);
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
        if(typeof db[id] === 'undefined')
            return false;
        db[id] = val;
        updateLastSet();
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
        if(typeof db[id] === 'undefined')
            return false;
        delete db[id];
        updateLastSet();
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
            (typeof db[id] === 'undefined')
        )
            return false;
        return true;
    };
    /*
     * @public
     * @return {boolean}
     */
    this.empty=function(){
        if( 0 === parseInt(count()))
            return true;
        return false;
    };
    /*
     * @public
     * @return integer
     */
    this.size=function(){
        return count();
    };
    /*
     * @public
     * @return {object}
     */
    this.stats=function(){
        count();
        return stats;
    };
    /*
     * @public
     * @return {void}
     */
    this.drop=function(){
        drop();
    };
    /*
     * @param {object}
     * @public
     * @return {boolean}
     */
    this.importing = function(importDb){
        db = importDb;
        return true;
    };
    /*
     * @private
     * @return {string}
     */
    let randomChar=function(){
        return Math.floor(
            Math.random()*36
        ).toString(36);
    };
    /*
     * @private
     * @return {string}
     */
    let newId = function (){
        let id = randomChar()+serial.toString(32)+randomChar();
        serial++;
        return id;
    };
    /*
     * @private
     * @return {boolean}
     */
    let updateLastGet = function (){
        stats.lastSet = (+new Date);
        return true;
    };
    /*
     * @private
     * @return {boolean}
     */
    let updateLastSet = function (){
        stats.lastSet = (+new Date);
        return true;
    };
    /*
     * @private
     * @return {integer}
     */
    let count = function (){
        if(stats.lastCount > stats.lastSet)
            return stats.count;
        let out = 0;
        let index = 0;
        for(let i in db){
            out++;
            index+=i.length;
        }
        stats.count     = out;
        stats.index     = index;
        stats.bytes     = JSON.stringify(db).toString().length;
        stats.lastCount = (+new Date);
        return out;
    };
    /*
     * @private
     * @var {dictonary}
     *
     */
    let dbHits = {};
    /*
     * @private
     * @var {dictonary}
     *
     */
    let stats = {
        count:0,
        bytes:0,
        index:0,
        start:(+new Date),
        lastSet:(+new Date),
        lastGet:(+new Date),
        lastCount:(+new Date)
    };
    /*
     * @private
     * @return {boolean}
     */
    let overflowCheck = function (){
        if(limit === 0)
            return true;
        let size = count();
        if (limit > size)
            return true;
        let overdo = count - limit;
        for(let i in db){
            delete db[i];
            overdo--;
            if(1>overdo)
                return true;
        }
    };
    /*
     * @private
     * @return {void}
     */
    let drop = function () {
        db = {};
    };
    /*
     * @private
     * @var {dictonary}
     */
    let db = {};
    /*
     * @private
     * @var {integer}
     */
    let serial = 0;
    /*
     * @private
     * @var {integer}
     */
    let limit = 100;


    /*
     * @param {string} id
     * @pirivate
     */
    const hitUpdate = function(id){
        if(typeof dbHits[id] === 'undefined'){
            dbHits[id] = {
                first : Math.round(Date.now()/1000),
                last  : Math.round(Date.now()/1000),
                hit   : 0
            };
        }else{
            dbHits[id].last = Math.round(Date.now()/1000);
            dbHits[id].hit++;
        }
    };
    /*
     * @param {string} val
     * @public
     * @return {string}
     */
    const add=function(val){
        let id = newId();
        set(id, val);
        return id;
    };

    /*
     * @param {string} id 
     * @param {string} val
     * @pirivate
     * @return {bool}
     */
    const set=function(id, val){
        db[id] = val;
        hitUpdate(id);
        updateLastSet();
        overflowCheck();
        return true; 
    };
    /*
     * @param {string} id
     * @public
     * @return {mixed}
     */
    const get=function(id){
        hitUpdate(id);
        updateLastGet();
        return db[id];
    };
    if (
        (typeof limitIn !== 'undefined')&&
       (parseInt(limitIn) === limitIn)&&
       (limitIn > 0)
    )
        limit = limitIn;
    //costructor
};


