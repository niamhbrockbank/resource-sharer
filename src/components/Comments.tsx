import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { baseUrl } from "../utils/baseUrl";
import { IComment } from "../utils/types";

interface IProps {
  resource_id: number;
  currentUserId: number | undefined;
}

export default function Comments({
  resource_id,
  currentUserId,
}: IProps): JSX.Element {
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentInput, setCommentInput] = useState<string>("");

  const getComments = useCallback(async () => {
    const serverResponse: IComment[] = (
      await axios.get(`${baseUrl}/resources/${resource_id}/comments`)
    ).data;
    setComments(serverResponse);
  }, [resource_id]);

  useEffect(() => {
    getComments();
  }, [resource_id, getComments]);

  async function submitComment(): Promise<void> {
    try {
      await axios.post(`${baseUrl}/resources/${resource_id}/comments`, {
        comment_body: commentInput,
        user_id: currentUserId,
      });
      getComments();
      setCommentInput("");
    } catch (error) {
      console.error(error);
    }
  }

  function handleKeyDown(key: string): void {
    if (key === "Enter") {
      submitComment();
    }
  }

  async function handleDeleteComment(comment_id: number): Promise<void> {
    try {
      await axios.delete(`${baseUrl}/resources/comments/${comment_id}`);
      getComments();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {currentUserId && (
        <div>
          <input
            onKeyDown={(e) => handleKeyDown(e.key)}
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={submitComment}>Add comment</button>
        </div>
      )}
      {comments.map((comment) => (
        <div key={comment.comment_id}>
          <p>{comment.comment_body}</p>
          <button onClick={() => handleDeleteComment(comment.comment_id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
