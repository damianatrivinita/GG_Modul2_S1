import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../redux/tokenSlice";
import url from "../../spotify/dataspotify";

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
    <div>
      <a
        href={url}
        className="login"
      >
        Login
      </a>
    </div>
  );
};

export default Login;