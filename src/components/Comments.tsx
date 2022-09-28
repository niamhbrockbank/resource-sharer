import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";
import { IComment } from "../utils/types";

interface IProps {
  resource_id: number;
}

export default function Comments({ resource_id }: IProps): JSX.Element {
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    async function getComments(): Promise<void> {
      const serverResponse: IComment[] = (
        await axios.get(`${baseUrl}/resources/${resource_id}/comments`)
      ).data;
      setComments(serverResponse);
    }
    getComments();
  }, [resource_id]);

  return (
    <div>
      {comments.map((comment) => (
        <p key={comment.comment_id}>{comment.comment_body}</p>
      ))}
    </div>
  );
}
