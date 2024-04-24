import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isPhoneValid } from "../../util/phoneValidation";

export default function CustomPhoneInput({ phoneVal, handleChange, setPhoneError, label }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <label
        htmlFor="phone"
        className={`text-sm font-bold uppercase ${!label.startsWith("Invalid") ? "text-stone-500" : "text-red-400"}`}
      >
        {label}
      </label>
      <PhoneInput
        id="phone"
        name="phone"
        value={phoneVal}
        country={"il"}
        inputStyle={{
          width: "100%",
          background: "rgb(231 229 228)",
          color: "rgb(87 83 78)",
          borderBottom: `${isFocused ? "2px solid RGB(75, 85, 99)" : "2px solid rgb(214 211 209)"}`,
        }}
        onChange={handleChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        isValid={(value) => isPhoneValid(value, setPhoneError)}
      />
    </>
  );
}
