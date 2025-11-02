import { Button, Card, Checkbox, Form, Input, message } from 'antd';
import { setCookie } from '../../../helpers/cookie';
import { loginCompany } from '../../../services/companyService';
import { checkLogin } from '../../../actions/login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

export const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);
    try {
      const { email, password } = values;
      const res = await loginCompany(email, password);

      console.log("res: ", res);

      if (res && res.length > 0) {
        // login success
        setCookie("id", res[0].id, 1);
        setCookie("companyName", res[0].companyName, 1);
        setCookie("email", res[0].email, 1);
        setCookie("token", res[0].email, 1);

        dispatchEvent(checkLogin(true));

        setTimeout(() => {
          messageApi.error('Login successfully!');
          navigate("/");
        }, 1000);
      } else {
        // login fail
        messageApi.error('Email or password is incorrect!');
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
      <h1>Login Page</h1>
      <Card title={"Login"} style={{ maxWidth: 300, margin: "0 auto" }}>
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

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
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