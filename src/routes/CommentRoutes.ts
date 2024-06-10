import { Router } from "express";
import CommentController from "../controllers/CommentController";

const CommentRouter = Router();

CommentRouter.get("/api/comments", CommentController.listComments);

CommentRouter.post("/api/comment", CommentController. createOrUpdateComment);

CommentRouter.delete("/api/comment/:id", CommentController.deleteComment);

export default CommentRouter;