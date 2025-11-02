import { Button, Card, Col, Row, Tag } from "antd";
import { Typography } from 'antd';
import { getListCompany } from "../../services/companyService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CompanyItem } from "../CompanyItem";

const { Text } = Typography;

export const CompanyList = () => {
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
      <h3>Company List</h3>

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

      <Link to="/company">
        <Button type="primary">View More</Button>
      </Link>
    </>
  );
};