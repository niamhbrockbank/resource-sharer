export interface IResourceRequest {
  resource_name: string;
  author_name: string;
  url: string;
  description: string;
  content_type: string;
  build_stage: string;
  opinion: string;
  opinion_reason: string;
  user_id: number;
}

export interface IResourceResponse extends IResourceRequest {
  resource_id: number;
  time_date: string;
}

export interface IComment {
  comment_id: number;
  resource_id: number;
  comment_body: string;
  user_id: number;
}

export interface MainComponentProps {
  resourceList: IResourceResponse[];
  setResourceList: React.Dispatch<React.SetStateAction<IResourceResponse[]>>;
}
