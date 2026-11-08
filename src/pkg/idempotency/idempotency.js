import { cacheProvider } from "../../lib/cache/initCache.js";

export function idempotency(ttl = 3600) {
    return async function (req, res, next) {
        const idempotency = req.headers["idempotency-key"];
        let key = `${req.method}:${req.originalUrl}:${idempotency}`;
        const cached = await cacheProvider.get(key);
        if (cached){
            res.setHeader("X-Cache","HIT");
            return res.json(JSON.parse(cached));
        }
        const originalJson = res.json.bind(res);
        res.json=(async (body)=>{
                if (res.statusCode >= 200 && res.statusCode < 300) {
                await cacheProvider.set(key , JSON.stringify(body) , ttl);
                res.setHeader("X-Cache","MIS");
            }
            return originalJson(body);
            })
    next();
    };
}
