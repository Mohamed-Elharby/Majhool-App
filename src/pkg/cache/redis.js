import {Redis} from "ioredis";

export class RedisCacheProvider{
    client;
    constructor(config){
    this.client = new Redis({
        host:config.host,
        port:config.port,
        maxLoadingRetryTime:3,
        lazyConnect:true
    })
    this.client.on("error",(error)=>{
        console.log("error in redis server" , error.message);
    })
    this.client.connect().catch((error)=>{
        console.log("fill in redis connect" , error.message);
    })
    }
    async set(key,value,ttl){
        return this.client.set(key , value ,"EX" , ttl)
    }
    async get(key){
        return this.client.get(key)
    }
    async del(key){
        return this.client.del(key)
    }
}