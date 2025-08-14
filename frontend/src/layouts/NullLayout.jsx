import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LoadingPageSkeleton from "../components/LoadingPageSkeleton";

const NullLayout = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  useEffect(() => {
    if (!isCheckingAuth && authUser) navigate("/");
  }, [isCheckingAuth, authUser]);
  if (isCheckingAuth && !authUser)
    return (
      <div className="w-full h-screen">
        <LoadingPageSkeleton />
      </div>
    );
  if (!isCheckingAuth && !authUser)
    return (
      <div>
        <main className="">
          <Outlet />
        </main>
      </div>
    );
};

export default NullLayout;
