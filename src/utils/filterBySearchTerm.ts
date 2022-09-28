import { IResourceResponse } from "./types";

export default function filterBySearchTerm(
  searchTerm: string,
  resource: IResourceResponse
): boolean {
  const { description, author_name, resource_name } = resource; // Include tags
  if (
    description.includes(searchTerm) ||
    author_name.includes(searchTerm) ||
    resource_name.includes(searchTerm)
  ) {
    return true;
  } else {
    return false;
  }
}
