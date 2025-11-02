import { useEffect, useState } from "react";
import { Card } from "antd";
import { getListCV } from "../../../services/cvService";

export const CVStatistic = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListCV();
      if (res) {
        console.log(res);
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        obj.total = res.length;
        res.forEach((item) => {
          item.statusRead ? obj.statusTrue++ : obj.statusFalse++
        })
        setData(obj);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card title="CV Statistic">
        <p>Job Total: <strong>{data?.total}</strong></p>
        <p>Status Read: <strong>{data?.statusTrue}</strong></p>
        <p>Status Not Read: <strong>{data?.statusFalse}</strong></p >
      </Card >
    </>
  )
}