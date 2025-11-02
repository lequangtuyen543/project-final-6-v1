import { Outlet } from "react-router-dom";

export const Main = () => {
  return (
    <>
      <div className="main">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </>
  );
}