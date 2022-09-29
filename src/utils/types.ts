export interface IResourceRequest {
  resource_name: string;
  author_name: string;
  url: string;
  description: string;
  content_type: string;
  build_stage: string;
  opinion: string;
  opinion_reason: string;
  user_id: number | undefined;
}

export interface IResourceResponse extends IResourceRequest {
  resource_id: number;
  time_date: string;
  user_name: string;
  tag_array: string[];
}

export interface ICommentResponse {
  comment_id: number;
  resource_id: number;
  comment_body: string;
  user_id: number;
  user_name: string
}

export interface MainComponentProps {
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}
