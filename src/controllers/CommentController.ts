import { Request, Response } from "express";
import CommentDataBaseService from "../services/CommentDataBaseService";

class CommentController {
  constructor() {}

  async listComments(req: Request, res: Response) {
    try {
      const comments = await CommentDataBaseService.listDBComments;
      res.json({
        status: "ok",
        users: comments,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createOrUpdateComment(req: Request, res: Response) {
    const id = req.params.id;
    const { postId, authorId } = req.body;

    if (!postId || !authorId) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
      return;
    }

    const commentData = {
      author: { connect: { id: authorId } },
      post: { connect: { id: postId } },
      created_at: new Date(),
      expiration: new Date(),
      update_at: new Date(),
    };

    try {
      let result;
      if (id) {
        result = await CommentDataBaseService.updateDBComment(commentData, id);
      } else {
        result = await CommentDataBaseService.insertDBComment(commentData);
      }
      res.json({
        status: "ok",
        newuser: result,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
      return;
    }

    try {
      const response = await CommentDataBaseService.deleteDBComment(id);
      if (response) {
        res.json({
          status: "ok",
          message: "Comment deletado com sucesso",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new CommentController();


