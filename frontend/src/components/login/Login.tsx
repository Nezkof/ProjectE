import { useEffect } from "react";
import "./login.css";
import { useUsersStore } from "../../hooks/stores/userStore";
import User from "/icons/user.svg";

const Login = () => {
   const currentUser = useUsersStore((state) => state.user);
   const isAuth = useUsersStore((state) => state.isAuth);
   const fetchUser = useUsersStore((state) => state.fetchUser);
   const logout = useUsersStore((state) => state.logout);

   useEffect(() => {
      if (!isAuth) {
         fetchUser();
      }
   }, []);

   const handleLogin = () => {
      if (!isAuth) {
         window.location.href = "http://localhost:8080/auth/google";
      } else {
         logout();
      }
   };

   return (
      <>
         <button className="login-button" onClick={handleLogin}>
            <span className="login-button__name">{currentUser?.name || ""}</span>
            <img className="login-button__picture" src={currentUser?.picture || User} alt="" />
         </button>
      </>
   );
};

export default Login;
