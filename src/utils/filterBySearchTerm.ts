import { IResourceResponse } from "./types";

export default function filterBySearchTerm(
  searchTerm: string,
  resource: IResourceResponse
): boolean {
  const { description, author_name, resource_name } = resource;
  //TODO: Include search/filter by tags

  if (description.toLowerCase().includes(searchTerm.toLowerCase())) {
    return true;
  } else if (author_name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return true;
  } else if (resource_name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return true;
  } else {
    return false;
  }
}
