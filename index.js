'use strict';


exports.poolrc=function(limitIn){
    /*
     * @param {integer} size
     * @public
     * @var mixed
     */
    this.first = function (size){
        if(typeof size === 'undefined')
            size = 1;
        let out = [];
        for(let i in db){
            out[i]=db[i];
            size --;
            if(1>size)
                break;

        }
        return out;
    };
    /*
     * @param {integer} size
     * @public
     * @var mixed
     */
    this.last = function (size){
        if(typeof size === 'undefined')
            size = 1;
        let out = [];
        let notout =  count()-size;
        for(let i in db){
            notout --;
            if(1>notout)
                out[i]=db[i];
        }
        return out;
    };
    /*
     * @public
     * @var object
     */
    this.full=function(){
        return db;
    };
    /*
     * @public
     * @var object
     */
    this.all=function(){
        let list = [];
        for (let i in db)
            list.push(db[i]);
        return list;
    };
    /*
     * @public
     * @var object
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
     * @var mixed
     */
    this.get=function(id){
        if(typeof id !== 'string')
            return false;
        if(typeof db[id] === 'undefined')
            return undefined;
        updateLastGet();
        return db[id];
    };
    /*
     * @param {string} val
     * @public
     * @var string
     */
    this.add=function(val){
        if(typeof val === 'undefined')
            return false;
        let id = newId();
        db[id] = val;
        updateLastSet();
        overflowCheck();
        return id;
    };
    /*
     * @param {string} id 
     * @param {string} val
     * @public
     * @var string
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
     * @var boolean
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
     * @var boolean
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
     * @var integer
     */
    this.size=function(){
        return count();
    };
    /*
     * @public
     * @var object
     */
    this.stats=function(){
        count();
        return stats;
    };
    /*
     * @private
     */
    let newId = function (){
        let id = 'a'+serial.toString()+'a';
        serial++;
        return id;
    };
    /*
     * @private
     * @var boolean
     */
    let updateLastGet = function (){
        stats.lastSet = (+new Date);
        return true;
    };
    /*
     * @private
     * @var boolean
     */
    let updateLastSet = function (){
        stats.lastSet = (+new Date);
        return true;
    };
    /*
     * @private
     * @var integer
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
        stats.count     = count;
        stats.index     = index;
        stats.bytes     = JSON.stringify(db).toString().length;
        stats.lastCount = (+new Date);
        return out;
    };
    /*
     * @private
     * @var object
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
     * @var boolean
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
     */
    let db = {};
    /*
     * @private
     */
    let serial = 0;
    /*
     * @private
     */
    let limit = 100;
    if (
       (typeof limitIn !== 'undefined')&&
       (parseInt(limitIn) === limitIn)&&
       (limitIn > 0)
    )
        limit = limitIn;
    //costructor
};


