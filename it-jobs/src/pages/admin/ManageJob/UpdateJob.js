import { Button, Col, Form, Input, message, Modal, Row, Select, Switch, Tooltip } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import { updateJob } from '../../../services/jobsServices';
import getTimeCurrent from '../../../helpers/time';
import { getListTags } from "../../../services/tagsServices";
import { getListCity } from "../../../services/cityServices";

export const UpdateJob = (props) => {
  const { record, onReload } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      values.updateAt = getTimeCurrent();
      const res = await updateJob(record.id, values);
      if (res) {
        messageApi.success("Update job successfully!");
        setIsModalOpen(false);
        onReload();
      } else {
        messageApi.error("Update job failed!");
      }
    } catch (error) {
      messageApi.error("Update job failed!");
    }
  }

  console.log(record);

  return (
    <>
      {contextHolder}
      <Tooltip title="Update">
        <Button icon={<EditOutlined />} type="primary" ghost onClick={showModal} />
      </Tooltip>

      <Modal
        title="Update Job"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width='100%'
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={record}>
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
              <Form.Item label="Salary:" name='salary' >
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
              <Form.Item label="Status:" name='status' valuePropName='checked'>
                <Switch defaultChecked />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Modal>
    </>
  )
}