const errorHandler = require("../../util/error_handler");

const Post = require("../models/postModel");
const { getUserById } = require("../models/userModel");

const { base64, extractUserIdFromToken } = require("../../util/common");

module.exports = {
  createPost: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const context = req.body.context;

      if (!context || context.trim() == "") {
        return errorHandler.handleClientError(res, "missingContext", 400);
      }

      try {
        const result = await Post.createPost(context, userId);
        const responseData = {
          data: {
            post: {
              id: result.insertId,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  updatePost: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const postId = Number(req.params.id);
      const context = req.body.context;
      const post = await Post.getPostById(postId);

      if (!postId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      } else if (!context || context.trim() == "") {
        return errorHandler.handleClientError(res, "missingContext", 400);
      } else if (!post) {
        return errorHandler.handleClientError(res, "postNotExist", 400);
      } else if (post.author_id != userId) {
        return errorHandler.handleClientError(res, "invalidPostUpdate", 400);
      }

      try {
        await Post.updatePost(postId, context);
        const responseData = {
          data: {
            post: {
              id: postId,
            },
          },
        };
        res.status(200).json({ responseData });
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  addLike: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const postId = Number(req.params.id);
      const postExist = await Post.getPostById(postId);
      const isLike = await Post.getIsLiked(postId, userId);

      if (!postId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      } else if (!postExist) {
        return errorHandler.handleClientError(res, "postNotExist", 400);
      } else if (isLike) {
        return errorHandler.handleClientError(res, "alreadySetLike", 400);
      }

      try {
        await Post.addLike(postId, userId);
        const responseData = {
          data: {
            post: {
              id: postId,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  deleteLike: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const postId = Number(req.params.id);
      const postExist = await Post.getPostById(postId);
      const isLike = await Post.getIsLiked(postId, userId);

      if (!postId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      } else if (!postExist) {
        return errorHandler.handleClientError(res, "postNotExist", 400);
      } else if (!isLike) {
        return errorHandler.handleClientError(res, "alreadySetUnlike", 400);
      }

      try {
        await Post.deleteLike(postId, userId);
        const responseData = {
          data: {
            post: {
              id: postId,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  createComment: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const postId = Number(req.params.id);
      const content = req.body.content;
      const postExist = await Post.getPostById(postId);

      if (!postId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      } else if (!content || content.trim() == "") {
        return errorHandler.handleClientError(res, "missingContext", 400);
      } else if (!postExist) {
        return errorHandler.handleClientError(res, "postNotExist", 400);
      }

      try {
        const result = await Post.createComment(postId, userId, content);
        const responseData = {
          data: {
            post: {
              id: postId,
            },
            comment: {
              id: result.insertId,
            },
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  getPostDetail: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const postId = Number(req.params.id);
      const postExist = await Post.getPostById(postId);

      if (!postId) {
        return errorHandler.handleClientError(res, "lostParams", 400);
      } else if (!postExist) {
        return errorHandler.handleClientError(res, "postNotExist", 400);
      }

      try {
        const postDetail = await Post.getPostDetail(postId, userId);

        const postComments = await Post.getPostComments(postId);

        const responseData = {
          data: {
            post: {
              id: postDetail.id,
              user_id: postDetail.author_id,
              created_at: postDetail.created_at,
              context: postDetail.context,
              is_liked: postDetail.is_liked === 1 ? true : false,
              like_count: postDetail.like_count,
              comment_count: postDetail.comment_count,
              picture: postDetail.author_picture,
              name: postDetail.author_name,
              comments: [],
            },
          },
        };

        for (comment of postComments) {
          commentData = {
            id: comment.id,
            created_at: comment.created_at,
            content: comment.content,
            user: {
              id: comment.user_id,
              name: comment.user_name,
              picture: comment.user_picture,
            },
          };
          responseData.data.post.comments.push(commentData);
        }
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  searchPosts: async (req, res) => {
    try {
      const currentUserId = extractUserIdFromToken(req);
      const user_id = Number(req.query.user_id);
      let cursor = req.query.cursor;

      if (user_id) {
        const userExist = await getUserById(user_id);
        if (!userExist) {
          return errorHandler.handleClientError(res, "userNotFound", 400);
        }
      }

      if (cursor) {
        const decodedCursor = base64.decode(cursor).split("-")[0];
        cursor = Number(decodedCursor);
      }

      try {
        const { posts, next_cursor } = await Post.searchPosts(
          currentUserId,
          user_id,
          cursor
        );
        const responseData = {
          data: {
            posts,
            next_cursor,
          },
        };

        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
  generateFakePosts: async (req, res) => {
    try {
      const userId = extractUserIdFromToken(req);
      const amount = parseInt(req.params.amount);

      try {
        const result = await Post.generateFakePosts(amount, userId);
        const responseData = {
          data: {
            message: `generate ${amount} posts done`,
          },
        };
        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.handleServerError(res, error, "sqlquery");
      }
    } catch (error) {
      errorHandler.handleServerError(res, error, "internalServer");
    }
  },
};
