import { Card, Tag } from "antd";
import { Typography } from 'antd';
import { Link } from 'react-router-dom'

const { Text } = Typography;

export const CompanyItem = (props) => {
  const { item } = props;

  console.log(item);

  return (
    <>
      {item && (
        <Card title={<Link to={`/company/${item.id}`}>{item.name}</Link>} style={{ height: "100%", padding: '0' }} size="small">
          <div className="mb-2">
            <span>Address: </span>
            <Text strong>{item.address}</Text>
          </div>

          <div className="mb-2">
            <span>Email: </span>
            <Text strong>{item.email}</Text>
          </div>

          <div className="mb-2">
            <span>Phone: </span>
            <Text strong>{item.phone}</Text>
          </div>
        </Card>
      )}
    </>
  );
};