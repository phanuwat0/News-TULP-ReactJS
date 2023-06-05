// file: ./component/LoginMenu.js
import { NavLink, redirect, useLocation } from "react-router-dom";
import { useAuth } from "../utils/AuthProvider";

export default function LoginMenu() {
  const auth = useAuth();
  const location = useLocation();
  return (
    <>
      {auth?.user?.email ? (
        <div className="user-menu">
          <ul>
            <li>
              <NavLink to="/new">สร้างโพสต์</NavLink>
            </li>
            <li
              onClick={() => {
                auth.signout(() => redirect("/post"));
              }}
            >
              <NavLink >ออกจากระบบ</NavLink>
            </li>
          </ul>
          <div>{auth.user.email}</div>
        </div>
      ) : (
        <NavLink to="/login" state={{ from: location.pathname }}>
          ลงชื่อเข้าใช้
        </NavLink>
      )}
    </>
  );
}
