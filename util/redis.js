const redis = require("redis");
const redisClient = redis.createClient();
// const redisClient = redis.createClient({
//   url: "redis://redis:6379",
// });
module.exports = {
  setCache: async (cacheKey, value, expiretime) => {
    try {
      await redisClient.connect();
      await redisClient.set(cacheKey, value, {
        EX: expiretime,
        NX: false,
      });
    } catch (error) {
      console.error("Redis error:", error);
    } finally {
      await redisClient.disconnect();
    }
  },
  delCache: async (cacheKey) => {
    try {
      await redisClient.connect();
      await redisClient.del(cacheKey);
    } catch (error) {
      console.error("Redis error:", error);
    } finally {
      await redisClient.disconnect();
    }
  },
  getCache: async (cacheKey) => {
    try {
      await redisClient.connect();
      const result = await redisClient.get(cacheKey);
      return result;
    } catch (error) {
      console.error("Redis error:", error);
    } finally {
      await redisClient.disconnect();
    }
  },
  incrCache: async (cacheKey) => {
    try {
      await redisClient.connect();
      const result = await redisClient.incr(cacheKey);
      return result;
    } catch (error) {
      console.error("Redis error:", error);
    } finally {
      await redisClient.disconnect();
    }
  },
  getUserProfileCache: async (currentId, otherUserId) => {
    try {
      await redisClient.connect();

      const cacheKeyProfile = `profile:basics#${otherUserId}`;
      const cacheKeyFriendCount = `profile:friend:count#${otherUserId}`;
      const cacheKeyFriendship = `profile:friendship#${currentId}#${otherUserId}`;

      const cacheExistProfile = await redisClient.exists(cacheKeyProfile);
      const cacheExistFriendCount = await redisClient.exists(
        cacheKeyFriendCount
      );
      const cacheExistFriendship = await redisClient.exists(cacheKeyFriendship);

      if (cacheExistProfile && cacheExistFriendCount && cacheExistFriendship) {
        const cacheResultsProfile = await redisClient.get(cacheKeyProfile);
        const cacheResultsFriendCount = await redisClient.get(
          cacheKeyFriendCount
        );
        const cacheResultsFriendship = await redisClient.get(
          cacheKeyFriendship
        );

        const basicProfile = JSON.parse(cacheResultsProfile);
        const friendCount = parseInt(cacheResultsFriendCount);
        const friendship = JSON.parse(cacheResultsFriendship);

        const results = {
          ...basicProfile,
          friend_count: friendCount,
          friendship: friendship,
        };
        return results;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Redis error:", error);
    } finally {
      await redisClient.disconnect();
    }
  },
  incrFriendCount: async (senderID, receiverId) => {
    try {
      await redisClient.connect();

      const cacheKey1 = `profile:friend:count#${senderID}`;
      const cacheKey2 = `profile:friend:count#${receiverId}`;

      await redisClient.incr(cacheKey1, cacheKey2);
    } catch (error) {
      console.error("Redis error:", error);
    } finally {
      await redisClient.disconnect();
    }
  },
  decrFriendCount: async (senderID, receiverId) => {
    try {
      await redisClient.connect();

      const cacheKey1 = `profile:friend:count#${senderID}`;
      const cacheKey2 = `profile:friend:count#${receiverId}`;

      await redisClient.decr(cacheKey1, cacheKey2);
    } catch (error) {
      console.error("Redis error:", error);
    } finally {
      await redisClient.disconnect();
    }
  },
};
