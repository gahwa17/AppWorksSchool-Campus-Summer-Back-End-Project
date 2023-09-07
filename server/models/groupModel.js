const pool = require("../../util/mysql");

module.exports = {
  getGroupByID: async (group_id) => {
    const query = "SELECT * FROM `groups` WHERE id = ?";
    try {
      const [result] = await pool.query(query, [group_id]);
      return result[0];
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  checkUserInGroup: async (group_id, user_id) => {
    const query =
      "SELECT * FROM group_relationship WHERE group_id = ? AND user_id = ?;";
    try {
      const [result] = await pool.query(query, [group_id, user_id]);
      // console.log('checkUserInGroup:', result);
      return result.length > 0;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  getUserInGroup: async (group_id, user_id) => {
    const query =
      "SELECT * FROM group_relationship WHERE group_id = ? AND user_id = ?;";
    try {
      const [result] = await pool.query(query, [group_id, user_id]);
      return result[0];
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  addUserToGroup: async (groupID, userId) => {
    const query =
      "INSERT INTO `group_relationship` (`group_id`, `user_id`, `status`) VALUES (?, ?, ?)";
    try {
      const [result] = await pool.query(query, [groupID, userId, "joined"]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },

  // getUserFromGroup: async (context, author_id) => {
  //     const query = '';
  //     try {
  //         const [result] = await pool.query(query, );
  //         return result;
  //     }
  //     catch (error) {
  //         throw error;
  //     }
  //     finally {
  //         pool.releaseConnection();
  //     }
  // },
  createGroup: async (group_name, owner_id) => {
    const query = "INSERT INTO `groups` (`name`, `owner_id`) VALUES (?, ?)";
    try {
      const [result] = await pool.query(query, [group_name, owner_id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  deleteGroup: async (group_id) => {
    const groupQuery = "DELETE FROM `groups` WHERE id = ?";
    const relationshipQuery =
      "DELETE FROM `group_relationship` WHERE group_id = ?";
    try {
      await pool.query(groupQuery, [group_id]);
      await pool.query(relationshipQuery, [group_id]);
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  applyGroup: async (group_id, userId) => {
    const query =
      "INSERT INTO `group_relationship` (group_id, user_id, status) VALUES (?, ?, ?)";
    try {
      const [result] = await pool.query(query, [group_id, userId, "applying"]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  checkGroupPending: async (groupId) => {
    const query = `
        SELECT user.id, user.name, user.picture, group_relationship.status
        FROM user
        JOIN group_relationship
        ON user.id = group_relationship.user_id
        WHERE group_relationship.group_id = ? AND group_relationship.status = "pending";
        `;
    try {
      const [result] = await pool.query(query, [groupId]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  agreeGroupRequest: async (groupID, userID) => {
    const query =
      'UPDATE group_relationship SET status = "joined" WHERE group_id = ? AND user_id = ?';
    try {
      const [result] = await pool.query(query, [groupID, userID]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  createGroupPost: async (context, userID, groupID) => {
    const query =
      "INSERT INTO `post` (`context`, `author_id`, `group_id`) VALUES (?, ?, ?)";
    try {
      const [result] = await pool.query(query, [context, userID, groupID]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  getGroupPosts: async (groupID, userID) => {
    const query = `
            SELECT
              p.id AS id,
              p.author_id AS author_id,
              DATE_FORMAT(p.created_at, "%Y-%m-%d %H:%i:%s") AS created_at,
              p.context AS context,
              IF(l.user_id IS NOT NULL, true, false) AS is_liked,
              COUNT(DISTINCT l2.id) AS like_count,
              COUNT(DISTINCT c.id) AS comment_count,
              u.picture AS author_picture,
              u.name AS author_name
            FROM post AS p
            LEFT JOIN likes AS l ON l.post_id = p.id AND l.user_id = ?
            LEFT JOIN likes AS l2 ON l2.post_id = p.id
            LEFT JOIN comments AS c ON c.post_id = p.id
            INNER JOIN user AS u ON u.id = p.author_id
            WHERE p.group_id = ? 
            GROUP BY p.id, p.created_at, p.context
            `;
    try {
      const [result] = await pool.query(query, [userID, groupID]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
};
/*
createGroup: async () => {
    const query = 'INSERT INTO `post` (`context`, `author_id`) VALUES (?, ?)';
    try {
        const [result] = await pool.query(query, );
        return result;
    }
    catch (error) {
        throw error;
    }
    finally {
        pool.releaseConnection();
    }
}
*/
