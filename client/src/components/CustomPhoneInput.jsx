import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { isPhoneValid } from "../util/phoneValidation";

export default function CustomPhoneInput({ phoneVal, handleChange, setPhoneError, label }) {
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
        country={"il"}
        inputStyle={{
          width: "100%",
          background: "rgb(231 229 228)",
          color: "rgb(87 83 78)",
          borderBottom: "2px solid rgb(214 211 209)",

          "&:focus": {
            borderBottom: "2px solid rgb(87 83 78)",
          },
        }}
        style={{
          marginBottom: "2em",
        }}
        onChange={handleChange}
        name="phone"
        value={phoneVal}
        isValid={(value) => isPhoneValid(value, setPhoneError)}
        // defaultErrorMessage={phoneError}
      />
    </>
  );
}
