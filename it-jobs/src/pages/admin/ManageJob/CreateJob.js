import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { editCompany, getDetailCompany } from "../../../services/companyService";
import { getCookie } from "../../../helpers/cookie";
import TextArea from "antd/es/input/TextArea";
import { getListTags } from "../../../services/tagsServices";
import { getListCity } from "../../../services/cityServices";
import { createJob } from "../../../services/jobsServices";
import getTimeCurrent from "../../../helpers/time";

const { Option } = Select;

export const CreateJob = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const idCompany = getCookie("id");

  const fetchData = async () => {
    const resTags = await getListTags();
    const resCity = await getListCity();
    if (resTags) {
      setTags(resTags);
    }
    if (resCity) {
      setCity(resCity);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const optionsTags = tags.map((item) => {
    return {
      value: item.name,
      label: item.name
    }
  })

  const optionsCity = city.map((item) => {
    return {
      value: item.value,
      label: item.value
    }
  })

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      values.idCompany = idCompany;
      values.createAt = getTimeCurrent();
      values.updateAt = getTimeCurrent();
      const res = await createJob(values);
      if (res) {
        messageApi.success("Create job successfully!");
        form.resetFields();
      } else {
        messageApi.error("Create job failed!");
      }
    } catch (error) {
      messageApi.error("Create job failed!");
    }
  }

  console.log(city);

  return (
    <>
      {contextHolder}
      <Card title="Create Job">
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ status: false }}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Job Name:" name='name' rules={[{ required: true, message: 'Please input company name!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={16}>
              <Form.Item label="Tags:" name='tags' rules={[{ required: true, message: 'Please input your tags!' }]}>
                <Select options={optionsTags} mode="multiple"></Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Salary:" name='address' >
                <Input type="number" placeholder="0.00" addonAfter="$" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="city" label="City"              >
                <Select options={optionsCity} mode="multiple" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Description:" name='description' >
                <TextArea rows={8} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Status read:" name='status' valuePropName="checked" >
                <Switch />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Card>
    </>
  );
}