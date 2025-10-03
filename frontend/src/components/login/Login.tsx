import { useEffect } from "react";
import "./login.css";
import { useUsersStore } from "../../hooks/stores/userStore";
import User from "/icons/user.svg";
import { useAlbumsStore } from "../../hooks/stores/albumStore";
import { useIgnoredAlbumsStore } from "../../hooks/stores/ignoredAlbumsStore";
import { useRankedAlbumsStore } from "../../hooks/stores/rankedAlbumsStore";

const Login = () => {
   const currentUser = useUsersStore((state) => state.user);
   const isAuth = useUsersStore((state) => state.isAuth);
   const fetchUser = useUsersStore((state) => state.fetchUser);
   const logout = useUsersStore((state) => state.logout);

   const clearAlbums = useAlbumsStore((state) => state.clearStore);
   const clearRankedAlbums = useRankedAlbumsStore((state) => state.clearStore);
   const clearIgnoredAlbums = useIgnoredAlbumsStore((state) => state.clearStore);

   useEffect(() => {
      if (!isAuth) {
         fetchUser();
      }
   }, []);

   const clearStores = () => {
      logout();
      clearAlbums();
      clearRankedAlbums();
      clearIgnoredAlbums();
   };

   const handleLogin = () => {
      if (!isAuth) {
         window.location.href = "http://localhost:8080/auth/google";
      } else {
         clearStores();
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
