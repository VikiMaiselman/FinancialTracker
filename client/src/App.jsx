import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

import { checkAuthStatus } from "./util/server-calls.js";
import { setAllState, setUserNotAuthState } from "./util/helpers.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const setUser = async () => {
      const { isAuthenticated, user } = await checkAuthStatus();

      if (!isAuthenticated) {
        return setUserNotAuthState(dispatch, false);
      }

      setAllState(dispatch, user, isAuthenticated);
    };
    setUser();
  }, []);

  return <AppRoutes />;
}

export default App;
