import { inputsValid } from "./inputsValid";
import { IResourceRequest } from "./types";

test.skip("inputsValid detects invalid inputs", () => {
  const testResource1: IResourceRequest = {
    resource_name: "",
    author_name: "",
    url: "",
    description: "",
    content_type: "",
    rating: NaN,
    notes: "",
    user_id: 2,
  };
  const testResource2: IResourceRequest = {
    resource_name: "Fault",
    author_name: "",
    url: "",
    description: "",
    content_type: "",
    rating: NaN,
    notes: "",
    user_id: 2,
  };
  const testResource3: IResourceRequest = {
    resource_name: "Truth",
    author_name: "Honest",
    url: "blabla.com",
    description: "honest truth",
    content_type: "truthiness",
    rating: 12,
    notes: "because its truth-conditions hold",
    user_id: 2,
  };

  expect(inputsValid(testResource1)).toBe(false);
  expect(inputsValid(testResource2)).toBe(false);
  expect(inputsValid(testResource3)).toBe(true);
});
