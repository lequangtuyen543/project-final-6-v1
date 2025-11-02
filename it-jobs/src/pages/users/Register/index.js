import { Button, Card, Form, Input, message } from 'antd';
import { checkExist, createCompany } from '../../../services/companyService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import generateToken from '../../../helpers/generateToken';
export const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      values.token = generateToken();
      
      const checkExistEmail = await checkExist("email", values.email);
      const checkExistPhone = await checkExist("phone", values.phone);

      if (checkExistEmail.length > 0) {
        messageApi.error('Email already exists!');
        return;
      } else if (checkExistPhone.length > 0) {
        messageApi.error('Phone already exists!');
        return
      }

      const res = await createCompany(values);

      if (res) {
        messageApi.success('Create company successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        messageApi.error('Create company failed!');
      }
    } catch (error) {
      messageApi.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      <h1>Register Page</h1>
      <Card title={"Register"} style={{ maxWidth: 300, margin: "0 auto" }}>
        <Form
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          // style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Company Name"
            name="name"
            rules={[{ required: true, message: 'Please input your company name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Company Phone"
            name="phone"
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}