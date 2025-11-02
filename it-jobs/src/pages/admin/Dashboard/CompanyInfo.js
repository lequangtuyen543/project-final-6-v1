import { useEffect, useState } from "react";
import { getDetailCompany } from "../../../services/companyService";
import { getCookie } from "../../../helpers/cookie";
import { Card } from "antd";
import { getListJobs } from "../../../services/jobsServices";

export const CompanyInfo = () => {
  const [company, setCompany] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const idCompany = getCookie("id");
      const resCompany = await getDetailCompany(idCompany);
      const resJob = await getListJobs();
      if (resCompany) {
        setCompany(resCompany);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card title="Company Info">
        <p>Name: <strong>{company?.name}</strong></p>
        <p>Email: <strong>{company?.email}</strong></p>
        <p>Phone: <strong>{company?.phone}</strong></p>
      </Card>
    </>
  )
}