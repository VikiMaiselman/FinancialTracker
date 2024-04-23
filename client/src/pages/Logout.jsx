import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../util/server-calls.js";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logOut = async () => {
      try {
        await logout();
        dispatch({
          type: "SET_USER",
          payload: { isAuthenticated: false },
        });
        dispatch({
          type: "SET_TXS",
          payload: null,
        });
        dispatch({
          type: "SET_STRUCTURE",
          payload: null,
        });
      } catch (error) {
        console.error(error);
      }
    };
    logOut();

    navigate("/signup", { replace: true });
  }, []);

  return <></>;
}
