const pool = require("../../util/mysql");

const { getUserById } = require("./userModel");

module.exports = {
  createFriendshipEvent: async (senderId, receiver_id, message) => {
    const sender = await getUserById(senderId);
    const summary = `${sender.name} ${message}`;

    const insertQuery =
      "INSERT INTO `event` (`type`, `is_read`, `summary`, `created_at`, `sender_id` , `receiver_id`) VALUES (?, ?, ?, NOW(), ?, ?)";
    const values = ["friend_request", false, summary, senderId, receiver_id];

    return await pool.query(insertQuery, values);
  },
  getEventByReceiver: async (receiver_id) => {
    const searchQuery =
      'SELECT id, type, is_read, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, summary, sender_id FROM `event` WHERE `receiver_id` = ? ORDER BY id DESC';
    const [result] = await pool.query(searchQuery, [receiver_id]);
    return result;
  },
  getEventById: async (event_id) => {
    const searchQuery =
      'SELECT id, type, is_read, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at, summary, sender_id, receiver_id FROM `event` WHERE `id` = ?';
    const [result] = await pool.query(searchQuery, [event_id]);
    return result[0];
  },
  setEventRead: async (event_id, receiver_id) => {
    const updateQuery =
      "UPDATE `event` SET is_read = ? WHERE `id` = ? AND `receiver_id` = ?";
    const result = await pool.query(updateQuery, [true, event_id, receiver_id]);
    return result[0];
  },
  getEvent: async (receiver_id) => {
    const query = `
        SELECT
            e.id,
            e.type,
            e.is_read,
            DATE_FORMAT(e.created_at, "%Y-%m-%d %H:%i:%s") AS created_at,
            summary,
            u2.picture,
            u2.name
        FROM event AS e
        INNER JOIN user AS u1 ON e.receiver_id = u1.id
        INNER JOIN user AS u2 ON e.sender_id = u2.id
        WHERE u1.id = ?
        ORDER BY e.id DESC
        `;
    try {
      const [result] = await pool.query(query, [receiver_id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
};
