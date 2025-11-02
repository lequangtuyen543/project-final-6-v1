import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { editCompany, getDetailCompany } from "../../../services/companyService";
import { getCookie } from "../../../helpers/cookie";
import TextArea from "antd/es/input/TextArea";
const { Option } = Select;

export const ManageCompany = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    const id = getCookie("id");
    const res = await getDetailCompany(id);
    if (res) {
      setData(res);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleSubmit = async (values) => {
    try {
      const res = await editCompany(data.id, values);
      if (res) {
        messageApi.success("Edit company successfully!");
        fetchData();
        setIsEdit(false);
      } else {
        messageApi.error("Edit company failed!");
      }
    } catch (error) {
      messageApi.error("Edit company failed!");
    }
  }

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.setFieldsValue(data);
  };

  console.log(data);

  return (
    <>
      {contextHolder}
      <Card title="Manage Company" extra={!isEdit ? <Button type="primary" onClick={handleEdit}>Edit</Button> : <Button type="default" onClick={handleCancel}>Cancel</Button>}>
        <Form form={form} layout="vertical" disabled={!isEdit} onFinish={handleSubmit}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Name:" name='name' rules={[{ required: true, message: 'Please input company name!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Email:" name='email' rules={[{ type: 'email', required: true, message: 'Please input company email!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item name="phone" label="Phone"              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Address:" name='address' >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Quantity People:" name='quantityPeople' >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Working Time:" name='workingTime' >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Website:" name='website' >
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Short Description:" name='description' >
                <TextArea rows={4} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Detail Description:" name='detailDescription' >
                <TextArea rows={8} />
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