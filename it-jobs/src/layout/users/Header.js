import { NavLink } from "react-router-dom";
import { Button, Space } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import { DashboardOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';

export const Header = () => {
  const token = getCookie("token");
  const isLogin = useSelector(state => state.loginReducer);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="logo">
            <NavLink to="/">
              IT Jobs
            </NavLink>
          </div>
          <div className="account">
            {token ? (
              <Space>
                <NavLink to="/admin/dashboard">
                  <Button icon={<DashboardOutlined />}>Manager</Button>
                </NavLink>
                <NavLink to="/logout">
                  <Button icon={<LogoutOutlined />}>Logout</Button>
                </NavLink>
              </Space>
            ) : (<Space>
              <NavLink to="/login">
                <Button icon={<LoginOutlined />}>Login</Button>
              </NavLink>
              <NavLink to="/register">
                <Button type="primary" icon={<UserAddOutlined />}>Register</Button>
              </NavLink>
            </Space>)}

          </div >
        </div >
      </header >
    </>
  );
}