import { AppstoreOutlined, BookOutlined, CompassOutlined, DashboardOutlined, MailOutlined, SettingOutlined, WechatOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

export const SiderApp = () => {
  const items = [
    {
      key: 'dashboard',
      label: <Link to="/admin/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: 'manage-company',
      label: <Link to="/admin/manage-company">Manage Company</Link>,
      icon: <CompassOutlined />,
    },
    {
      key: 'manage-job',
      label: <Link to="/admin/manage-job">Manage Job</Link>,
      icon: <WechatOutlined />,
    },
    {
      key: 'manage-cv',
      label: <Link to="/admin/manage-cv">Manage CV</Link>,
      icon: <BookOutlined />,
    },
  ];

  return (
    <Menu
      // onClick={onClick}
      // style={{ width: 256 }}
      defaultSelectedKeys={['dashboard']}
      // defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};