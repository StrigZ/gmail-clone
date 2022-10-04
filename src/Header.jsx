import "./Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, IconButton } from "@mui/material";
import { Apps, ArrowDropDown, Notifications } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./features/userSlice";
import { getAuth } from "firebase/auth";
const Header = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const signOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };
  return (
    <div className="header">
      <div className="header__left">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <img
          src="https://www.freepnglogos.com/uploads/logo-gmail-png/logo-gmail-png-gmail-icon-download-png-and-vector-1.png"
          alt=""
        />
      </div>
      <div className="header__middle">
        <SearchIcon className="header__middle-search" />
        <input type="text" placeholder="Search mail" />
        <ArrowDropDown className="header__input-caret" />
      </div>
      <div className="header__right">
        <IconButton>
          <Apps />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
        <Avatar
          onClick={signOut}
          referrerpolicy="no-referrer"
          src={user?.photoURL}
        />
      </div>
    </div>
  );
};
export default Header;
