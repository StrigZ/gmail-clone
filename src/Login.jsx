import { Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";
import { provider } from "./firebase";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const signIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error.errorMessage);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://blog.hubspot.com/hubfs/image8-2.jpg" alt="" />
        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
};
export default Login;
