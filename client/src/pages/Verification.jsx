import React from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Button from "../components/elements/Button.jsx";

import { checkAuthStatus, verifyUser } from "../util/server-calls.js";
import { setAllState } from "../util/helpers.js";

export default function Verification() {
  /* state, hooks */
  const [otpDigits, setOtpDigits] = React.useState(Array.from({ length: 6 }, () => ""));
  const inputRefs = React.useRef([]);

  /* location & navigation */
  const location = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  /* event handlers */
  const handleChange = (idx, value) => {
    const updatedDigits = [...otpDigits];
    updatedDigits[idx] = value;
    setOtpDigits(updatedDigits);

    // Moves cursor to the next input (if not at the last slot)
    if (idx < 5 && value.length === 1) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleMoveCursorOnBackspacePress = (key, idx, value) => {
    if (key === "Backspace" && idx > 0 && value.length === 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleClickVerify = async (e) => {
    const data = location.state;
    const updatedData = { ...data, otp: otpDigits.join("") };
    console.log(updatedData);
    const response = await verifyUser(updatedData);
    console.log(response);

    if (response === "approved") {
      const { user, isAuthenticated } = await checkAuthStatus();
      console.log(response, user, isAuthenticated);
      setAllState(dispatch, user, isAuthenticated);
      return navigate("/");
    }
    // error case
    return navigate("/signup");
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="w-2/3 h-3/4 flex flex-col justify-center items-center text-center">
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>

          <CardDescription>
            Enter Two-factor <br /> Authentication Password
          </CardDescription>
        </CardHeader>

        <CardContent>
          {React.Children.toArray(
            otpDigits.map((_, idx) => {
              return (
                <input
                  className="w-10 h-10 mx-1 p-1 border-2 border-stone-400"
                  ref={(ref) => (inputRefs.current[idx] = ref)}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleMoveCursorOnBackspacePress(e.key, idx, e.target.value)}
                  maxLength="1"
                />
              );
            })
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleClickVerify}>Verify</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
