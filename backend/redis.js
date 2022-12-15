import { createClient } from "redis";
import config from "./config.js";


const client = createClient({
    socket: {
        host: config.REDIS_HOST,
        port: config.REDIS_PORT
    }
})


client.on('error', (err) => console.log('Redis Client Error', err));
console.log("Redis database started")
await client.connect()

export default client;