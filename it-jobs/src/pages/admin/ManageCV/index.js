import { useEffect, useState } from "react";
import { getListCV } from "../../../services/cvService";
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteCV, DeleteJob } from "./DeleteCV";
import { JobName } from "./JobName";

export const ManageCV = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getListCV();
    if (res) {
      setData(res.reverse());
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleReload = () => {
    fetchData();
  }

  const columns = [
    {
      title: 'Job',
      dataIndex: 'job',
      key: 'job',
      render: (_, record) => {
        return <JobName idJob={record.idJob} />;
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Create at',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Status read',
      key: 'statusRead',
      render: (_, record) => {
        return record.statusRead ? (
          <Tag color="green">True</Tag>
        ) : (
          <Tag color="red">False</Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Read">
            <Link to={`/admin/read-cv/${record.id}`}>
              <Button icon={<EyeOutlined />} type="default" />
            </Link>
          </Tooltip>
          <DeleteCV record={record} onReload={handleReload} />          
        </Space>
      ),
    },
  ];

  console.log(data);

  return (
    <>
      <h3>Manage CV</h3>
      <Table columns={columns} dataSource={data} />
    </>
  );
}