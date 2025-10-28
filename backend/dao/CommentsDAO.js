import { ObjectId } from "mongodb";

let comments; 

export default class CommentsDAO {
  // Initialize MongoDB connection
  static async injectDB(db) {
    if (comments) return;
    const collectionName =
      process.env.COMMENTS_COLLECTION_NAME || "comments_mfh";
    comments = db.collection(collectionName);
  }

  static async addComment({ competitionId, text, userName, userId }) {
    try {
      const doc = {
        competition_id: competitionId,
        text,
        user_name: userName,
        user_id: userId,
        lastModified: new Date(),
      };
      return await comments.insertOne(doc);
    } catch (e) {
      console.error(`Unable to add comment: ${e}`);
      return { error: e };
    }
  }

  static async getAllComments() {
    try {
      return await comments.find({}).toArray();
    } catch (e) {
      console.error(`Unable to get comments: ${e}`);
      return [];
    }
  }

  static async updateComment({ commentId, text, userName, userId }) {
    try {
      return await comments.updateOne(
        { _id: new ObjectId(commentId), user_id: userId }, // only update your own comment
        {
          $set: {
            text,
            user_name: userName,
            lastModified: new Date(),
          },
        }
      );
    } catch (e) {
      console.error(`Unable to update comment: ${e}`);
      return { error: e };
    }
  }

  static async deleteComment({ commentId, userId }) {
    try {
      return await comments.deleteOne({
        _id: new ObjectId(commentId),
        user_id: userId,
      });
    } catch (e) {
      console.error(`Unable to delete comment: ${e}`);
      return { error: e };
    }
  }
}