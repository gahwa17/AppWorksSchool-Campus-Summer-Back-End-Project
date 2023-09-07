const pool = require("../../util/mysql");

module.exports = {
  createFriendship: async (senderId, receiverId) => {
    const insertQuery =
      "INSERT INTO `friendship` (`sender_id`, `receiver_id`, `status`) VALUES (?, ?, ?)";
    const result = await pool.query(insertQuery, [
      senderId,
      receiverId,
      "requested",
    ]);
    return result[0];
  },
  deleteFriendshipById: async (friendshipId) => {
    const deleteQuery = "DELETE FROM `friendship` WHERE `id` = ?";
    return await pool.query(deleteQuery, [friendshipId]);
  },
  updateFriendshipStatus: async (friendshipId, status) => {
    const updateQuery = "UPDATE `friendship` SET `status` = ? WHERE `id` = ?";
    return await pool.query(updateQuery, [status, friendshipId]);
  },
  getPendingFriendRequests: async (userId) => {
    const selectQuery =
      "SELECT * FROM `friendship` WHERE `receiver_id` = ? AND `status` = ?";
    const result = await pool.query(selectQuery, [userId, "requested"]);
    return result[0];
  },
  checkFriendship: async (senderId, receiverId) => {
    const selectQuery =
      "SELECT * FROM `friendship` WHERE (`sender_id` = ? AND `receiver_id` = ?) OR (`sender_id` = ? AND `receiver_id` = ?)";
    const [friendshipExists] = await pool.query(selectQuery, [
      senderId,
      receiverId,
      receiverId,
      senderId,
    ]);
    return friendshipExists[0];
  },
  checkFriendshipExistsById: async (friendshipId, userId) => {
    const selectQuery =
      "SELECT * FROM `friendship` WHERE `id` = ? AND (`sender_id` = ? OR `receiver_id` = ?)";
    const [rows] = await pool.query(selectQuery, [
      friendshipId,
      userId,
      userId,
    ]);
    return rows[0];
  },
  getFriendship: async (friendshipId) => {
    const selectQuery = "SELECT * FROM `friendship` WHERE `id` = ? ";
    const [rows] = await pool.query(selectQuery, [friendshipId]);
    return rows[0];
  },
  searchAllFriends: async (userId) => {
    const selectQuery =
      "SELECT * FROM `friendship` WHERE (`sender_id` = ? OR receiver_id = ?) AND `status` = ?";
    const [rows] = await pool.query(selectQuery, [userId, userId, "friend"]);
    return rows;
  },
  countFriends: async (userId) => {
    const query =
      "SELECT COUNT(*) AS friend_count FROM `friendship` WHERE (`sender_id` = ? OR receiver_id = ?) AND `status` = ?";
    const [rows] = await pool.query(query, [userId, userId, "friend"]);
    return rows[0].friend_count;
  },
  getStatus: (friendship, id) => {
    if (friendship.status === null) {
      return null;
    } else if (friendship.status === "friend") {
      return "friend";
    } else if (friendship.sender_id === id) {
      return "requested";
    } else {
      return "pending";
    }
  },
};
