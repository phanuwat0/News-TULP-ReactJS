import { NavLink, Outlet } from "react-router-dom";
import './MainLayout.css';
import LoginMenu from "../component/LoginMenu";
const MainLayout = () => {
  return (
    <div className="container">
      <nav>
        <NavLink to="/home">หน้าหลัก</NavLink>&nbsp;
        <NavLink to="/posts">ถูกใจ</NavLink>&nbsp;
        <NavLink to="/about">เกี่ยวกับ</NavLink>&nbsp;
        <LoginMenu />
      </nav>
      <h1> ธรรมศาสตร์และกิจกรรม </h1>
      <h1 className="eng"> THAMMASAT AND ACTIVITY</h1>
      <div className="container">
        <Outlet /> {/* your content will be shown in the Outlet */}
      </div>
    </div>
  );
};

export default MainLayout;
