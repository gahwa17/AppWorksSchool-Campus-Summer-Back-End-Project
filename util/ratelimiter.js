const Redis = require('./redis');

module.exports = (limit, interval) => {
    return async (req, res, next) => {
        try {
            const ip = req.headers['x-real-ip'];

            const cacheKey = `rateLimit:${ip}`;

            const requestCount = await Redis.getCache(cacheKey);

            if (!requestCount) {
                await Redis.setCache(cacheKey, 0, interval);
            }

            if (parseInt(requestCount) >= limit) {
                return res.status(429).json({ error: 'Too Many Requests' });
            }

            await Redis.incrCache(cacheKey);

            next();
        }
        catch (error) {
            console.error('Rate Limiter Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
  