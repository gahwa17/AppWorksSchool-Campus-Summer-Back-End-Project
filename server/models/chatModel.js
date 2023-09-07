const pool = require("../../util/mysql");
const { base64 } = require("../../util/common");

module.exports = {
  sendMessage: async (userID, targetUserID, message) => {
    const query =
      "INSERT INTO chat (sender_id, receiver_id, message) VALUES (?, ?, ?)";
    try {
      const [result] = await pool.query(query, [userID, targetUserID, message]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  getMessages: async (userID, targetUserID, cursor = null) => {
    const limit = 11;
    const postsPerPage = 10;

    let query = `
        SELECT
            c.id AS message_id,
            c.message,
            DATE_FORMAT(c.created_at, "%Y-%m-%d %H:%i:%s") AS created_at,
            u.id AS user_id,
            u.name,
            u.picture
        FROM chat AS c
        INNER JOIN user AS u ON u.id = c.sender_id
        WHERE (c.sender_id = ? AND c.receiver_id = ?)
        OR (c.sender_id = ? AND c.receiver_id = ?)
        `;

    let params = [userID, targetUserID, targetUserID, userID];

    if (cursor) {
      query += " AND c.id < ?";
      params.push(cursor);
    }

    query += " ORDER BY c.id DESC LIMIT ?";
    params.push(limit);

    try {
      // console.log('query:', query, params);

      const [result] = await pool.query(query, params);
      let messages = [];

      result.forEach((row, index) => {
        if (index == postsPerPage) {
          return;
        }

        const message = {
          id: row.message_id,
          message: row.message,
          created_at: row.created_at,
          user: {
            id: row.user_id,
            name: row.name,
            picture: row.picture,
          },
        };

        messages.push(message);
      });

      let next_cursor = null;
      if (result.length == limit) {
        const currentTimestamp = Date.now();
        const combinedString = `${
          messages[messages.length - 1].id
        }-${currentTimestamp}`;
        next_cursor = base64.encode(combinedString);
      }

      return { messages, next_cursor };
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
};
