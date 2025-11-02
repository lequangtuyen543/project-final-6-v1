import { useEffect, useState } from "react";
import { getListJobs } from "../../../services/jobsServices";
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { CreateJob } from "./CreateJob";
import { UpdateJob } from "./UpdateJob";
import { DeleteJob } from "./DeleteJob";

export const ManageJob = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getListJobs();
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
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            return (
              <Tag color='blue' key={tag} className="mb-1">
                {tag}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Create at',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Update at',
      dataIndex: 'updateAt',
      key: 'updateAt',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return record.status ? (
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
            <Link to={`/admin/read-job/${record.id}`}>
              <Button icon={<EyeOutlined />} type="default" />
            </Link>
          </Tooltip>
          <UpdateJob record={record} onReload={handleReload} />
          <DeleteJob record={record} onReload={handleReload} />          
        </Space>
      ),
    },
  ];

  console.log(data);

  return (
    <>
      <h3>Manage Job</h3>
      <Link to="/admin/create-job">
        <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: 20 }}>Create Job
        </Button>
      </Link>
      <Table columns={columns} dataSource={data} />
    </>
  );
}