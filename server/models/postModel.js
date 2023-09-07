const { post } = require("../routes/postRoute");
const pool = require("../../util/mysql");
const base64 = require("base-64");

module.exports = {
  getPostById: async (post_id) => {
    const query =
      'SELECT id, context, author_id, DATE_FORMAT(created_at, "%Y-%m-%d %H:%i:%s") AS created_at FROM `post` WHERE `id` = ?';
    try {
      const [result] = await pool.query(query, [post_id]);
      return result[0];
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  getIsLiked: async (post_id, user_id) => {
    const query = "SELECT * FROM `likes` WHERE `post_id` = ? AND user_id = ?";
    try {
      const [result] = await pool.query(query, [post_id, user_id]);
      return result[0];
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  createPost: async (context, author_id) => {
    const query = "INSERT INTO `post` (`context`, `author_id`) VALUES (?, ?)";
    try {
      const [result] = await pool.query(query, [context, author_id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  updatePost: async (post_id, context) => {
    const query = "UPDATE `post` SET `context` = ? WHERE `id` = ?";
    try {
      const [result] = await pool.query(query, [context, post_id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  addLike: async (post_id, user_id) => {
    const query = "INSERT INTO `likes` (post_id, user_id) VALUES (?, ?)";
    try {
      const [result] = await pool.query(query, [post_id, user_id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  deleteLike: async (post_id) => {
    const query = "DELETE FROM `likes` WHERE `post_id` = ?";
    try {
      const [result] = await pool.query(query, [post_id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  createComment: async (post_id, user_id, content) => {
    const query =
      "INSERT INTO `comments` (`post_id`, `user_id`, `content`) VALUES (?, ?, ?)";
    try {
      const [result] = await pool.query(query, [post_id, user_id, content]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  getPostDetail: async (post_id, user_id) => {
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
        WHERE p.id = ?
        GROUP BY p.id, p.created_at, p.context
        `;
    try {
      const [result] = await pool.query(query, [user_id, post_id]);
      return result[0];
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  getPostComments: async (post_id) => {
    const query = `
        SELECT
            c.id AS id,
            DATE_FORMAT(c.created_at, "%Y-%m-%d %H:%i:%s") AS created_at,
            c.content AS content,
            u.id AS user_id,
            u.name AS user_name,
            u.picture AS user_picture
        FROM comments AS c
        INNER JOIN post AS p ON c.post_id = p.id
        INNER JOIN user AS u ON u.id = c.user_id
        WHERE p.id = ?;
        `;
    try {
      const [result] = await pool.query(query, [post_id]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  searchPosts: async (current_user_id, user_id, cursor) => {
    const limit = 11;
    const postsPerPage = 10;
    let query = `
        SELECT
            p.id,
            p.author_id,
            DATE_FORMAT(p.created_at, "%Y-%m-%d %H:%i:%s") AS created_at,
            p.context,
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
        `;
    let params = [current_user_id];

    if (!user_id) {
      query += ` WHERE p.author_id IN 
            (
            SELECT sender_id FROM friendship WHERE receiver_id = ? AND status = 'friend'
            UNION
            SELECT receiver_id FROM friendship WHERE sender_id = ? AND status = 'friend'
            )
            OR p.author_id = ?
            `;
      params.push(current_user_id, current_user_id, current_user_id);
    } else {
      query += " WHERE p.author_id = ?";
      params.push(user_id);
    }

    query += " GROUP BY p.id";

    if (cursor) {
      query += " HAVING p.id < ?";
      params.push(cursor);
    }

    query += " ORDER BY p.id DESC LIMIT ?";
    params.push(limit);

    try {
      const [result] = await pool.query(query, params);

      let posts = [];
      result.forEach((row, index) => {
        if (index == postsPerPage) {
          return;
        }

        const post = {
          id: row.id,
          user_id: row.author_id,
          created_at: row.created_at,
          context: row.context,
          is_liked: row.is_liked,
          like_count: row.like_count,
          comment_count: row.comment_count,
          picture: row.author_picture,
          name: row.author_name,
        };

        posts.push(post);
      });

      let next_cursor = null;
      if (result.length == limit) {
        const currentTimestamp = Date.now();
        const combinedString = `${
          posts[posts.length - 1].id
        }-${currentTimestamp}`;
        next_cursor = base64.encode(combinedString);
      }

      return { posts, next_cursor };
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
  generateFakePosts: async (amount, author_id) => {
    const query = "INSERT INTO `post` (`context`, `author_id`) VALUES ?";
    const posts = [];

    for (let i = 1; i <= amount; i++) {
      const context = `Test post - ${i}`;
      posts.push([context, author_id]);
    }

    try {
      const [result] = await pool.query(query, [posts]);
      return result;
    } catch (error) {
      throw error;
    } finally {
      pool.releaseConnection();
    }
  },
};
