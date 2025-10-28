import express from "express";
import CompetitionsController from "./competitions.controller.js";
import CommentsController from "./comments.controller.js";

const router = express.Router();

router.get("/", CompetitionsController.apiGetCompetitions);

router.post("/comments", CommentsController.apiPostComment);
router.put("/comments", CommentsController.apiUpdateComment);
router.delete("/comments", CommentsController.apiDeleteComment);

router.get("/comments", async (req, res) => {
  try {
    const comments = await CommentsController.apiGetComments(req, res);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

export default router;
