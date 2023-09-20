import { Outlet, useLocation, useNavigate } from "react-router";
import AdminNav from "./adminNav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAdminAuth, fetchProducts } from "../../redux/actions";

export default function AdminLayout() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname.includes("/admin/login");
  useEffect(() => {
    document.title = "Admin";
    dispatch(fetchProducts());
    dispatch(checkAdminAuth(navigate));
  }, [dispatch]);
  return (
    <>
      {!isLoginPage && <AdminNav />}
      <Outlet />
    </>
  );
}
