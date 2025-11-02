import { useEffect, useState } from "react";
import { getDetailJob } from "../../../services/jobsServices";

export const JobName = ({ idJob }) => {
  const [jobName, setJobName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailJob(idJob);
      if (res) {
        setJobName(res.name);
      }
    };
    fetchData();
  }, []);

  return <>{jobName}</>;
};