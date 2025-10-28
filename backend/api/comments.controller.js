import CommentsDAO from "../dao/CommentsDAO.js";

export default class CommentsController {
  static async apiGetComments(req, res) {
    try {
      const comments = await CommentsDAO.getAllComments();
      return res.json(comments);
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

  static async apiPostComment(req, res) {
    try {
      const { competition_id, text, user_name, user_id } = req.body;
      if (!competition_id || !text || !user_name || !user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await CommentsDAO.addComment({
        competitionId: competition_id,
        text,
        userName: user_name,
        userId: user_id,
      });

      return res.json({ status: "success", comment_id: result?.insertedId });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateComment(req, res) {
    try {
      const { comment_id, text, user_name, user_id } = req.body;
      if (!comment_id || !text || !user_name || !user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await CommentsDAO.updateComment({
        commentId: comment_id,
        text,
        userName: user_name,
        userId: user_id,
      });

      if (!result?.modifiedCount) {
        return res.status(400).json({ error: "No document updated" });
      }
      return res.json({ status: "success", modifiedCount: result.modifiedCount });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteComment(req, res) {
    try {
      const { comment_id, user_id } = req.body;
      if (!comment_id || !user_id) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const result = await CommentsDAO.deleteComment({
        commentId: comment_id,
        userId: user_id,
      });

      if (!result?.deletedCount) {
        return res.status(400).json({ error: "No document deleted" });
      }
      return res.json({ status: "success", deletedCount: result.deletedCount });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: e.message });
    }
  }
}