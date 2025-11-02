import { useParams } from "react-router-dom";
import { GoBack } from "../../../components/GoBack"
import { useEffect, useState } from "react";
import { getDetailJob } from "../../../services/jobsServices";
import { Divider, Tag } from "antd";
import { changeStatusCV, getDetailCV } from "../../../services/cvService";

export const ReadCV = () => {
  const params = useParams();
  const [data, setData] = useState();
  const [dataJob, setDataJob] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailCV(params.id);
      if (res) {
        const resJob = await getDetailJob(res.idJob);
        if (resJob) {
          setDataJob(resJob);
        }
        setData(res);
      }
      changeStatusCV(params.id, { statusRead: true });
    };
    fetchData();
  }, [])

  console.log(data);
  console.log(dataJob);

  return (
    <>
      <GoBack />
      {data && (
        <>
          <h3>Candidate Name: {data.name}</h3>

          <div className="mb-2">
            <span>Create at: </span>
            <strong>{data.createAt}</strong>
          </div>

          <div className="mb-2">
            <span>Phone: </span>
            <strong>{data.phone}</strong>
          </div>

          <div className="mb-2">
            <span>Email: </span>
            <strong>{data.email}</strong>
          </div>

          <div className="mb-2">
            <span>City: </span>
            {dataJob.city && dataJob.city.map(tag => <Tag color="orange" key={tag}>{tag.toUpperCase()}</Tag>)}
          </div>

          <div className="mb-2">
            <span>Self description: </span>
            <strong>{data.description}</strong>
          </div>

          <div className="mb-2">
            <span>Link project: </span>
            <strong>{data.linkProject}</strong>
          </div>

          <Divider />

          <h3>Job Name: {dataJob.name}</h3>

          <div className="mb-2">
            <span>Status read: </span>
            {dataJob.status ? <Tag color="green">True</Tag> : <Tag color="red">False</Tag>}
          </div>

          <div className="mb-2">
            <span>Tags: </span>
            {dataJob.tags && dataJob.tags.map(tag => <Tag color="blue" key={tag}>{tag.toUpperCase()}</Tag>)}
          </div>

          <div className="mb-2">
            <span>Salary: </span>
            <strong>{dataJob.salary}</strong>
          </div>

          <div className="mb-2">
            <span>Create at: </span>
            <strong>{dataJob.createAt}</strong>
          </div>

          <div className="mb-2">
            <span>Update at: </span>
            <strong>{dataJob.updateAt}</strong>
          </div>

          <div className="mb-2">
            <span>City: </span>
            {dataJob.city && dataJob.city.map(tag => <Tag color="orange" key={tag}>{tag.toUpperCase()}</Tag>)}
          </div>

          <div className="mb-2">
            <span>Description: </span>
            <strong>{dataJob.description}</strong>
          </div>
        </>
      )}
    </>
  )
}