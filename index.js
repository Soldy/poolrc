"use strict"
const fs = require("fs");



exports.poolrc=function(){
    /*
     * @public
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
     * @public
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
     */
    this.all=function(){
        return db;
    };
    /*
     * @param {string} id
     * @public
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
     * return {string} id
     */
    this.add=function(val){
        if(typeof val === "undefined")
            return false;
        let id = newId();
        db[id] = val;
        overflowcheck();
        return id;
    };
    /*
     * @param {string}- id
     * @public
     */
    this.check=function(id){
        if((typeof id !== "string") ||(typeof config[id] !== "undefined"))
            return true;
        return false;
    }
    /*
     * @private
     */
    let newId = function (){
        let id = "a"+serital.toString()+"a";
        serial++;
        return id;
    }
    let count = function (){
        let out = 0;
        for(let i in db)
            out++;
        return out;
    }
    let overflowCheck = function (){
        let size = count();
        if (limit > count)
            return true;
        let overdo = count - limit;
        for(let i in db){
            delete db[i];
            overdo--;
            if(1>overdo)
                return true;
        )
    }
    /*
     * @private
     */
    let idb = {};
    let serial = 0;
    let index = [];
    let limit = 100;
    let 
    //costructor
    readDefault();
    read();
};


