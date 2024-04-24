import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

import { composeDataForBackend } from "../util/helpers.js";
import { checkAuthStatus, signUp } from "../util/server-calls.js";
import { setAllState } from "../util/helpers.js";
import ButtonMenu from "../components/ButtonMenu.jsx";
import CustomPhoneInput from "../components/CustomPhoneInput.jsx";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Authentication() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* state */
  const [activeTab, setActiveTab] = React.useState(0);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    phone: "",
  });

  /* error state */
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");

  /* event handlers for onChange */
  const handleChangeTab = (e, newValue) => {
    e.preventDefault();
    setActiveTab(newValue);
  };

  const handleChangeUserData = (e) => {
    let name, value;
    setEmailError("");
    setPasswordError("");
    setPhoneError("");

    if (typeof e === "object") {
      name = e.target.name;
      value = e.target.value;
    }
    if (typeof e === "string") {
      name = "phone";
      value = e;
    }

    setUserData((prevSt) => {
      return { ...prevSt, [name]: value };
    });
  };

  /* validation */
  const handleEmailBlur = () => {
    if (userData.email.trim() === "") setEmailError("Error: required field");
    if (!emailPattern.test(userData.email)) setEmailError("Error: provide a valid email");
  };
  const handlePasswordBlur = () => {
    if (userData.password.trim() === "") setPasswordError("Error: required field");
    if (userData.password.trim().length < 3)
      setPasswordError("Error: your password should be at least 3 characters long");
  };

  const shouldDisableButton =
    !userData.email ||
    (activeTab === 0 && !userData.phone) ||
    !userData.password ||
    Boolean(passwordError) ||
    Boolean(phoneError);

  /* event handlers for onClick */
  const handleClick = async (e) => {
    e.preventDefault();
    const data = composeDataForBackend(userData, activeTab);
    const response = await signUp(data);

    if (response === "pending") {
      dispatch({
        type: "SET_USER",
        payload: {
          isBeingVerified: true,
        },
      });
      return navigate("/verification", { state: data, replace: true });
    }
    // error case
    return navigate("/sign-up");
  };

  const handleClickNoTwilio = async (e) => {
    e.preventDefault();
    const data = composeDataForBackend(userData, activeTab, false);
    const response = await signUp(data);

    if (response === "approved") {
      const { user, isAuthenticated } = await checkAuthStatus();
      setAllState(dispatch, user, isAuthenticated);
      return navigate("/");
    }
    // error case
    return navigate("/sign-up");
  };

  return (
    <div className="h-screen w-full flex overflow-scroll flex-col md:flex-row md:h-auto">
      <div className="flex-1 h-screen flex flex-col justify-center gap-5 py-12 px-12 text-center">
        <h2 className="mb-8 font-bold uppercase md:text-5xl text-stone-900">Money Tracker</h2>
        <h2 className="mb-8 font-semibold md:text-xl text-stone-900">
          Sign Up or Log In to see your current financial state
        </h2>

        <form>
          <div>
            <ButtonMenu value={activeTab}>
              <button
                className="my-4 text-stone-900 border-b-stone-300 border-b-2 focus:border-b-stone-700"
                id="signup"
                onClick={(e) => handleChangeTab(e, 0)}
              >
                Sign Up
              </button>
              <button
                className="my-4 text-stone-900 border-b-stone-300 border-b-2 focus:border-b-stone-700"
                id="signin"
                onClick={(e) => handleChangeTab(e, 1)}
              >
                Sign In
              </button>
            </ButtonMenu>
          </div>

          <Input
            id="email"
            onChange={handleChangeUserData}
            name="email"
            value={userData.email}
            label={emailError ? emailError : "Email"}
            onBlur={handleEmailBlur}
          />

          <Input
            id="password"
            type="password"
            onChange={handleChangeUserData}
            name="password"
            value={userData.password}
            label={passwordError ? passwordError : "Password"}
            onBlur={handlePasswordBlur}
          />

          {!activeTab && (
            <CustomPhoneInput
              phoneVal={userData.phone}
              handleChange={handleChangeUserData}
              setPhoneError={setPhoneError}
              label={phoneError ? phoneError : "Phone Number"}
            />
          )}
          <ButtonMenu>
            <Button onClick={handleClick} disabled={shouldDisableButton}>
              {activeTab === 0 ? "Sign Up" : "Sign In"}
            </Button>
            <Button size="small" onClick={handleClickNoTwilio} disabled={shouldDisableButton}>
              {activeTab === 0 ? "Sign Up (no Twilio)" : "Sign In (no Twilio)"}
            </Button>
          </ButtonMenu>
        </form>
      </div>

      <div className="flex-1 h-screen flex flex-col justify-center gap-5 py-12 px-12 text-center bg-gradient-to-r from-stone-500 to-stone-800">
        <AccountBalanceWalletIcon sx={{ color: "white", width: "100%" }} style={{ fontSize: 150 }} />
        <h2 className="mb-8 font-bold uppercase md:text-4xl text-stone-100">Take Care of Your Money</h2>
        <h2 className="mb-8 font-normal md:text-xl text-stone-100 tracking-wider">
          The only application you need to be in full charge of your finance
        </h2>
      </div>
    </div>
  );
}
