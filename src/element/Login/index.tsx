import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/tokenSlice";
import url from "../../spotify/dataspotify";
import Button from '@mui/material/Button';

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setToken(getToken()));
  }, [dispatch]);

  const getToken = () => {
    const queryString = new URL(window.location.href.replace("#", "?"))
      .searchParams;
    const accessToken = queryString.get("access_token");

    return accessToken;
  };

  return (
    <div className="login">
      <Button className="login" variant="contained" href={url}>Login</Button>
    </div>
  );
};

export default Login;