import { IResourceResponse } from "./types";

export default function filterBySearchTerm(
  searchTerm: string,
  resource: IResourceResponse
): boolean {
  const { description, author_name, resource_name } = resource;
  //TODO: Include search/filter by tags

  if (description.includes(searchTerm)) {
    return true;
  } else if (author_name.includes(searchTerm)) {
    return true
  } else if (resource_name.includes(searchTerm)) {
    return true
  } else {
    return false;
  }
}
