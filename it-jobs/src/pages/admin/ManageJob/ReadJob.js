import { useParams } from "react-router-dom";
import { GoBack } from "../../../components/GoBack"
import { useEffect, useState } from "react";
import { getDetailJob, updateJob } from "../../../services/jobsServices";
import { Tag } from "antd";

export const ReadJob = () => {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailJob(params.id);
      if (res) {
        setData(res);
      }
    };
    fetchData();
  }, [])

  console.log(data);

  return (
    <>
      <GoBack />
      {data && (
        <>
          <h1>Job Name: {data.name}</h1>

          <div className="mb-2">
            <span>Status read: </span>
            {data.status ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>}
          </div>

          <div className="mb-2">
            <span>Tags: </span>
            {data.tags.map(tag => <Tag color="blue" key={tag}>{tag.toUpperCase()}</Tag>)}
          </div>

          <div className="mb-2">
            <span>Salary: </span>
            <strong>{data.salary}</strong>
          </div>

          <div className="mb-2">
            <span>Create at: </span>
            <strong>{data.createAt}</strong>
          </div>

          <div className="mb-2">
            <span>Update at: </span>
            <strong>{data.updateAt}</strong>
          </div>

          <div className="mb-2">
            <span>City: </span>
            {data.city && data.city.map(tag => <Tag color="orange" key={tag}>{tag.toUpperCase()}</Tag>)}
          </div>

          <div className="mb-2">
            <span>Description: </span>
            <strong>{data.description}</strong>
          </div>
        </>
      )}
    </>
  )
}