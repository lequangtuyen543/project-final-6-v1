import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../../services/jobsServices";
import { GoBack } from "../../../components/GoBack";
import { Button, Card, Checkbox, Input, Tag, Typography, Form, Col, Row, Select, message } from "antd";
import { getDetailCompany } from "../../../services/companyService";
import TextArea from "antd/es/input/TextArea";
import { createCV } from "../../../services/cvService";
import getTimeCurrent from "../../../helpers/time";

const { Text } = Typography;
export const JobDetail = () => {
  const params = useParams();
  const [job, setJob] = useState();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      const job = await getDetailJob(params.id);
      const infoCompany = await getDetailCompany(job.idCompany);
      setJob({ ...job, infoCompany });
    }
    fetchApi();
  }, [params.id]);

  const onFinish = async values => {
    console.log('Success:', values);
    values.idJob = job.id;
    values.idCompany = job.infoCompany.id;
    values.createAt = getTimeCurrent();

    const res = await createCV(values);
    if (res) {
      messageApi.open({
        type: 'success',
        content: 'Create CV successfully',
      });
      form.resetFields();
    } else {
      messageApi.open({
        type: 'error',
        content: 'Create CV failed',
      });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  console.log("job", job);

  return (
    <>
      {contextHolder}
      <GoBack />
      {job && (
        <>
          <div className="mb-4">
            <h1>Job: {job.name}</h1>

            <Button type="primary" className="mb-3" href="#formApply" size="large">Apply Now</Button>

            <div className="mb-2">
              <span>Tags: </span>
              {job.tags && job.tags.map((item, index) => <Tag color="blue" key={index} className="mb-1">{item}</Tag>)}
            </div>

            <div className="mb-2">
              <span>City: </span>
              {job.city && job.city.map((item, index) => <Tag color="orange" key={index} className="mb-1">{item}</Tag>)}
            </div>

            <div className="mb-2">
              <span>Salary: </span>
              <Text strong>{job.salary}</Text>
            </div>

            <div className="mb-2">
              <span>Company: </span>
              <Text strong>{job?.infoCompany?.name}</Text>
            </div>

            <div className="mb-2">
              <span>Address: </span>
              <Text strong>{job?.infoCompany?.address}</Text>
            </div>

            <div className="mb-2">
              <span>Create at: </span>
              <Text strong>{job.createAt}</Text>
            </div>

            <div className="mb-2">
              <span>Job description: </span>
              <Text strong>{job.description}</Text>
            </div>

            <div className="mb-2">
              <span>Company description: </span>
              <Text strong>{job?.infoCompany?.description}</Text>
            </div>
          </div>

          <Card title="Apply for this job" style={{ marginTop: 30 }}>
            <Form name="formApply"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              layout="vertical"
              form={form}>
              <Row gutter={16}>
                <Col span={6}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[{ required: true, message: 'Please input!', type: 'phone' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input!', type: 'email' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[{ required: true, message: 'Please input!' }]}
                  >
                    <Select options={job.city.map((item, index) => ({ value: item, label: item, key: index }))} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Self Description"
                name="description"
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <TextArea rows={6} />
              </Form.Item>

              <Form.Item
                label="Link Project"
                name="linkProject"
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <TextArea rows={6} />
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </>
      )
      }
    </>
  );
};