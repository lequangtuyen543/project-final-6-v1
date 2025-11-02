import PrivateRoutes from "../components/PrivateRoutes/index.js";
import { LayoutAdmin } from "../layout/admin/index.js";
import { LayoutDefault } from "../layout/users";
import { Company } from "../pages/users/Company/index.js";
import { CompanyDetail } from "../pages/users/CompanyDetail/index.js";
import { Home } from "../pages/users/Home";
import { JobDetail } from "../pages/users/JobDetail.js";
import { Login } from "../pages/users/Login/index.js";
import { Logout } from "../pages/users/Logout/index.js";
import { Register } from "../pages/users/Register/index.js";
import { Search } from "../pages/users/Search";
import { Dashboard } from "../pages/admin/Dashboard";
import { ManageCompany } from "../pages/admin/ManagerCompany/index.js";
import { ManageJob } from "../pages/admin/ManageJob/index.js";
import { ManageCV } from "../pages/admin/ManageCV/index.js";
import { ReadJob } from "../pages/admin/ManageJob/ReadJob.js";
import { CreateJob } from "../pages/admin/ManageJob/CreateJob.js";
import { ReadCV } from "../pages/admin/ManageCV/ReadCV.js";

export const routes = [
  // Public layout
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <Logout /> },
      { path: "register", element: <Register /> },
      { path: "search", element: <Search /> },
      { path: "job/:id", element: <JobDetail /> },
      { path: "company", element: <Company /> },
      { path: "company/:id", element: <CompanyDetail /> },
    ],
  },

  // Admin layout (protected)
  {
    path: "/admin",
    element: <PrivateRoutes />, // chỉ bọc bảo vệ ở đây
    children: [
      {
        element: <LayoutAdmin />, // layout admin riêng
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "manage-company", element: <ManageCompany /> },
          { path: "manage-job", element: <ManageJob /> },
          { path: "manage-cv", element: <ManageCV /> },
          { path: "create-job", element: <CreateJob /> },
          { path: "read-job/:id", element: <ReadJob /> },
          { path: "read-cv/:id", element: <ReadCV /> },
          // thêm route admin khác ở đây
        ],
      },
    ],
  },
];

