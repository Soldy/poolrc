"use strict"
const fs = require("fs");



exports.poolrc=function(){
    /*
     * @param {string} name
     * @param {string} value
     * @public
     * @var boolean
     */
    this.setup = function(name,value){
        if(
            (name === 'limit')&&
            (value === parseInt(value))&&
            (value > -1)
        ){

        }
        return false;

    }
    /*
     * @param {integer} size
     * @public
     * @var mixed
     */
    this.first = function (size){
        if(typeof size === "undefined")
            size = 1;
        let oiut = {};
        for(let i in db){
            out[i]=db[i];
            size --;
            if(1>size)
                break;

        }
        return out;
    }
    /*
     * @param {integer} size
     * @public
     * @var mixed
     */
    this.last = function (size){
        if(typeof size === "undefined")
            size = 1;
        let oiut = {};
        let notout =  count()-size;
        for(let i in db){
            noutout --;
            if(1>notout)
                out[i]=db[i];
        }
        return out;
    }
    /*
     * @public
     * @var object
     */
    this.all=function(){
        return db;
    };
    /*
     * @param {string} id
     * @public
     * @var mixed
     */
    this.get=function(id){
        if(typeof id !== "string")
            return false;
        if(typeof db[id] === "undefined")
            return undefined;
        return db[id];
    };
    /*
     * @param {string} val
     * @public
     * @var string
     */
    this.add=function(val){
        if(typeof val === "undefined")
            return false;
        let id = newId();
        db[id] = val;
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
        if(typeof id === "undefined")
            return false;
        if(typeof val === "undefined")
            return false;
        if(typeof db[id] === "undefined")
            return false;
        db[id] = val;
        return true 
    };
    /*
     * @param {string} id
     * @public
     * @var boolean
     */
    this.del=function(id){
        if(typeof id !== "string")
            return false;
        if(typeof db[id] === "undefined")
            return false;
        delete db[id];
        return true;
    };
    /*
     * @param {string}- id
     * @public
     * @var boolean
     */
    this.check=function(id){
        if(
            (typeof id !== "string") ||
            (typeof db[id] === "undefined")
        )
            return false;
        return true;
    }
    /*
     * @private
     */
    let newId = function (){
        let id = "a"+serial.toString()+"a";
        serial++;
        return id;
    }
    /*
     * @private
     * @var integer
     */
    let count = function (){
        let out = 0;
        for(let i in db)
            out++;
        return out;
    }
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
    }
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
    let index = [];
    /*
     * @private
     */
    let limit = 100;
    //costructor
};


