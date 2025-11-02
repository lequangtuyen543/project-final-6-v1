import { useEffect, useState } from "react";
import { getListTags } from "../../services/tagsServices";
import { Tag } from "antd";
import { Link } from "react-router-dom";

export const TagsList = () => {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTags();
      if (response) {
        setTags(response);
      }
    };
    fetchApi();
  }, []);

  console.log("tags", tags);

  return (
    <>
      <div className="mb-5">
        {tags.length > 0 && tags.map((item) => (
          <Link to={`/search?keyword=${item.name || ""}`} key={item.id}>
            <Tag color="blue" className="mb-1">{item.name}</Tag>
          </Link>
        ))}
      </div>
    </>
  );
};