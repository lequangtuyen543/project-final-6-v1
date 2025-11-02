import { Button, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react";
import { getListCity } from "../../services/cityServices";
import { useNavigate } from 'react-router-dom'

export const SearchForm = () => {
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity(`city`);
      if (response) {
        setCity(response);
      }
    };
    fetchApi();
  }, []);

  const cityOptions = [
    { value: "All", label: "All" },
    ...city.map((item) => ({
      value: item.value,
      label: item.value,
    })),
  ]

  const onFinish = values => {
    console.log('Success:', values);
    let city = values.city || "";
    city = values.city === "All" ? "" : city;
    let keyword = values.keyword || "";
    navigate(`/search?city=${city}&keyword=${keyword}`)
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={[12, 12]}>
          <Col span={6}>
            <Form.Item
              name="city"
              // rules={[{ required: true, message: 'Please input your city!' }]}
            >
              <Select options={cityOptions} placeholder="Select city" />
            </Form.Item>
          </Col>

          <Col span={15}>
            <Form.Item
              name="keyword"
            >
              <Input placeholder='Enter keyword...' />
            </Form.Item>
          </Col>

          <Col span={3}>
            <Form.Item label={null}>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
                Search
              </Button>
            </Form.Item>
          </Col>

        </Row>
      </Form>
    </>
  );
};