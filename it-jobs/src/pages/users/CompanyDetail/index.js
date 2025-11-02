import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob, getListJobs } from "../../../services/jobsServices";
import { GoBack } from "../../../components/GoBack";
import { Button, Card, Checkbox, Input, Tag, Typography, Form, Col, Row, Select, message } from "antd";
import { getDetailCompany } from "../../../services/companyService";
import TextArea from "antd/es/input/TextArea";
import { createCV } from "../../../services/cvService";
import getTimeCurrent from "../../../helpers/time";
import { JobItem } from "../../../components/JobItem.js";

const { Text } = Typography;
export const CompanyDetail = () => {
  const params = useParams();
  const [company, setCompany] = useState();
  const [job, setJob] = useState([]);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      const infoCompany = await getDetailCompany(params.id);
      setCompany(infoCompany);
      const jobList = await getListJobs();
      const jobByCompany = jobList.filter((item) => item.idCompany == params.id);
      setJob(jobByCompany);
    }
    fetchApi();
  }, [params.id]);

  console.log("job", job);

  return (
    <>
      {contextHolder}
      <GoBack />
      {company && (
        <>
          <div className="mb-4">
            <h1>Company: {company.name}</h1>

            <div className="mb-2">
              <span>Address: </span>
              <Text strong>{company.address}</Text>
            </div>

            <div className="mb-2">
              <span>Description: </span>
              <Text strong>{company.description}</Text>
            </div>

            <div className="mb-2">
              <span>Email: </span>
              <Text strong>{company.email}</Text>
            </div>

            <div className="mb-2">
              <span>Phone: </span>
              <Text strong>{company.phone}</Text>
            </div>

            <div className="mb-2">
              <span>Website: </span>
              <Text strong>{company.website}</Text>
            </div>

          </div>
        </>
      )
      }
      {job.length > 0 ? (
        <>
          <h3>Job List</h3>
          <Row className="mb-4" gutter={[20, 20]}>
            {job.map((item) => (
              <Col span={8} className="job-item" key={item.id}>
                <JobItem item={item} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div className="mb-4">
          <h3>Not Found</h3>
        </div>
      )}
    </>
  );
};