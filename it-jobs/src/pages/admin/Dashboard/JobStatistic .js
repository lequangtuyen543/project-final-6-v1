import { useEffect, useState } from "react";
import { Card } from "antd";
import { getListJobs } from "../../../services/jobsServices";

export const JobStatistic = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListJobs();
      if (res) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        obj.total = res.length;
        res.forEach((item) => {
          item.status ? obj.statusTrue++ : obj.statusFalse++
        })
        setData(obj);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card title="Job Statistic">
        <p>Job Total: <strong>{data?.total}</strong></p>
        <p>Status True: <strong>{data?.statusTrue}</strong></p>
        <p>Status False: <strong>{data?.statusFalse}</strong></p >
      </Card >
    </>
  )
}