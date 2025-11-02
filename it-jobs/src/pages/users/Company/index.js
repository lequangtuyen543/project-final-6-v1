import { Button, Card, Col, Row, Tag } from "antd";
import { Typography } from 'antd';
import { useEffect, useState } from "react";
import Link from "antd/es/typography/Link";
import { CompanyItem } from "../../../components/CompanyItem";
import { getListCompany } from "../../../services/companyService";
import { GoBack } from "../../../components/GoBack";

const { Text } = Typography;

export const Company = () => {
  const [company, setCompany] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCompany();
      if (response) {
        setCompany(response);
      }
    };
    fetchApi();
  }, []);

  const dataFinal = company;
  // console.log("dataFinal", dataFinal);
  return (
    <>
      <h1>Company Page</h1>

      <GoBack />

      {dataFinal.length > 0 ? (
        <Row className="mb-4" gutter={[20, 20]}>
          {dataFinal.map((item) => (
            <Col span={8} className="job-item" key={item.id}>
              <CompanyItem item={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="mb-4">
          <h3>Not Found</h3>
        </div>
      )}
    </>
  );
};