import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { composeDataForBackend, signUp } from "../util/helpers.js";
// import emailValidationSchema from "../util/emailValidation.js";
// import { isPhoneValid } from "../util/phoneValidation.js";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function Authentication() {
  /* state and hooks */
  const [activeTab, setActiveTab] = React.useState(0);
  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
    phone: "",
  });

  const user = useSelector((state) => state.user);
  const balance = useSelector((state) => state.balance);
  const dispatch = useDispatch();

  /* error state */
  const [isTwilioError, setIsTwilioError] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const navigate = useNavigate();

  /* computed values */
  const shouldDisableButton =
    !userData.email ||
    (activeTab === 0 && !userData.phone) ||
    !userData.password ||
    Boolean(emailError) ||
    Boolean(phoneError);

  /* event handlers for onChange */
  const handleChangeTab = (e, newValue) => {
    setActiveTab(() => newValue);
  };

  const handleChangeUserData = (e) => {
    let name, value;
    setEmailError("");
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

  /* event handlers for validation */
  const handleEmailBlur = () => {
    const email = userData.email;
    // emailValidationSchema.validate({ email }).catch((error) => setEmailError(error.message));
  };

  /* event handlers for onClick */
  const handleClick = async () => {
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
    if (response === "isTwilioError") setIsTwilioError(true);

    // other error
    return navigate("/sign-up");
  };

  const handleClickNoTwilio = async () => {
    const data = composeDataForBackend(userData, activeTab, false);
    const response = await signUp(data);

    if (response === "approved") {
      dispatch({
        type: "SET_USER",
        payload: {
          isAuthenticated: true,
          isBeingVerified: false,
        },
      });
      return navigate("/");
    }
    return navigate("/sign-up");
  };

  return (
    /*   flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.5%;
  flex: 1;
  padding: 50px;
  text-align: center;*/
    <div className="h-screen w-full flex overflow-hidden flex-col md:flex-row md:h-auto">
      <div className="flex-1 h-screen flex flex-col justify-center gap-5 py-12 px-12 text-center">
        <h2 className="mb-8 font-bold uppercase md:text-4xl text-stone-900">Money Tracker</h2>
        <h2 className="mb-8 font-semibold md:text-xl text-stone-900">
          Register or Log In to see your current financial state
        </h2>

        <form>
          <div sx={{ borderBottom: 1, borderColor: "divider", alignSelf: "center" }}>
            <menu value={activeTab} onChange={handleChangeTab}>
              <button id="signup" label="Sign Up" />
              <button id="signin" label="Sign In" />
            </menu>
          </div>

          <Input
            id="email"
            onChange={handleChangeUserData}
            name="email"
            value={userData.email}
            label="Email"
            onBlur={handleEmailBlur}
            error={Boolean(emailError)}
            // helperText={emailError}
          />

          <Input
            id="password"
            type="password"
            // sx={{ marginBottom: `${activeTab === 0 ? "1em" : "2em"}` }}
            onChange={handleChangeUserData}
            name="password"
            label="Password"
            value={userData.password}
          />

          {!activeTab && (
            <>
              <label htmlFor="phone" className="text-sm font-bold uppercase text-stone-500">
                Phone Number
              </label>
              <PhoneInput
                id="phone"
                country={"il"}
                inputStyle={{ width: "100%", background: "rgb(231 229 228)", color: "rgb(87 83 78)" }}
                style={{ marginBottom: "2em" }}
                onChange={handleChangeUserData}
                name="phone"
                value={userData.phone}
                // isValid={(value) => isPhoneValid(value, setPhoneError)}
                defaultErrorMessage={phoneError}
              />
            </>
          )}

          <Button onClick={handleClick} disabled={shouldDisableButton}>
            {activeTab === 0 ? "Sign Up" : "Sign In"}
          </Button>
          {/* <PaleStyledButton variant="contained" size="small" onClick={handleClickNoTwilio} disabled={!isTwilioError}> */}
          <Button size="small" onClick={handleClickNoTwilio} disabled={shouldDisableButton}>
            {activeTab === 0 ? "Sign Up (no Twilio)" : "Sign In (no Twilio)"}
          </Button>
        </form>
      </div>

      <div className="flex-1 h-screen flex flex-col justify-center gap-5 py-12 px-12 text-center bg-gradient-to-r from-stone-500 to-stone-800">
        {/* s<i class="user fa-regular fa-user fa-10x" style="color: #ffffff"></i> */}
        <AccountBalanceWalletIcon sx={{ color: "white", width: "100%" }} style={{ fontSize: 150 }} />
        <h2 className="mb-8 font-bold uppercase md:text-4xl text-stone-100">Your Financial Tracker</h2>
        <h2 className="mb-8 font-normal md:text-xl text-stone-100">
          The only application you need to be in complete charge of your money.
        </h2>
      </div>
    </div>
  );
}
