const pool = require("../../util/mysql");

module.exports = {
  // Mysql
  getUserByEmail: async (email) => {
    const [userRow] = await pool.query(
      "SELECT * FROM `user` WHERE `email` = ?",
      [email]
    );
    return userRow[0];
  },
  getUserById: async (id) => {
    const [userRow] = await pool.query("SELECT * FROM `user` WHERE `id` = ?", [
      id,
    ]);
    return userRow[0];
  },
  getUserByKeyword: async (keyword) => {
    const searchQuery = "SELECT * FROM `user` WHERE `name` LIKE ?";
    const [userRows] = await pool.query(searchQuery, `%${keyword}%`);
    return userRows;
  },
  insertNewUser: async (name, email, hashedPassword) => {
    const insertQuery =
      "INSERT INTO `user` (name, email, password) VALUES (?, ?, ?)";
    return await pool.query(insertQuery, [name, email, hashedPassword]);
  },
  updateUser: async (id, name, introduction, tags) => {
    const updateQuery =
      "UPDATE `user` SET name = ?, introduction = ?, tags = ? WHERE id = ?";
    return await pool.query(updateQuery, [name, introduction, tags, id]);
  },
  pictureUpdate: async (id, filename) => {
    const pictureUrl = `https://${process.env.HOST_NAME}/public/images/${filename}`;
    const updateQuery = "UPDATE `user` SET picture = ? WHERE id = ?";
    await pool.query(updateQuery, [pictureUrl, id]);
    return pictureUrl;
  },
};
