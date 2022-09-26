import axios from "axios";
import { useEffect, useState } from "react";

interface PropsTags {
  tags: { tag_name: string }[];
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        tag_name: string;
      }[]
    >
  >;
}

export function SelectOrCreateTag({ tags, setTags }: PropsTags): JSX.Element {
  const dbURL = "http://localhost:4000";

  const [currentTag, setCurrentTag] = useState<string>("");
  const [allTags, setAllTags] = useState<{ tag_name: string }[]>([]);

  useEffect(() => {
    const getTags = async () => {
      try {
        const tagsResponse = await axios.get(dbURL + "/tags");
        setAllTags(tagsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    getTags();
  }, []);

  const handleCreateNewTag = () => {
    setAllTags([...allTags, { tag_name: currentTag }]);
    setCurrentTag("");
  };

  const handleRemoveTag = (tag: { tag_name: string }) => {
    setTags(tags.filter((arrayItem) => arrayItem.tag_name !== tag.tag_name));
  };

  return (
    <>
      <input
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
      />
      <button onClick={handleCreateNewTag}>Add new tag</button>
      <div className="tag-cloud">
        {allTags
          .filter((tag) => tag.tag_name.includes(currentTag))
          .map((tag, i) => (
            <button key={i} onClick={() => setTags([...tags, tag])}>
              {tag.tag_name}
            </button>
          ))}
      </div>
      <div className="selected-tags">
        {tags.map((tag, i) => (
          <button key={i} onClick={() => handleRemoveTag(tag)}>
            {tag.tag_name} x
          </button>
        ))}
      </div>
    </>
  );
}
