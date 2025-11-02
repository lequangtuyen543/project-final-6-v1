import { Card, Tag } from "antd";
import { Typography } from 'antd';
import { Link } from 'react-router-dom'

const { Text } = Typography;

export const JobItem = (props) => {
  const { item } = props;

  console.log(item);

  return (
    <>
      {item && (
        <Card title={<Link to={`/job/${item.id}`}>{item.name}</Link>} style={{ height: "100%", padding: '0' }} size="small">
          <div className="mb-2">
            <span>Tags: </span>
            {item.tags && item.tags.map((item, index) => <Tag color="blue" key={index} className="mb-1">{item}</Tag>)}
          </div>

          <div className="mb-2">
            <span>City: </span>
            {item.city && item.city.map((item, index) => <Tag color="orange" key={index} className="mb-1">{item}</Tag>)}
          </div>

          <div className="mb-2">
            <span>Salary: </span>
            <Text strong>{item.salary}</Text>
          </div>

          <div className="mb-2">
            <span>Company: </span>
            <Text strong>{item?.infoCompany?.name}</Text>
          </div>

          <div className="mb-2">
            <span>Create at: </span>
            <Text strong>{item.createAt}</Text>
          </div>

        </Card>
      )}
    </>
  );
};