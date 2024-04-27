import { useState } from "react";
import { useSelector } from "react-redux";

import DialogCustom from "./elements/DialogCustom";
import Input from "./elements/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { checkAuthStatus, createSubcategory } from "../util/server-calls";
import { setAllMoneyState } from "../util/helpers";

export default function CreateSubcategory() {
  const categories = useSelector((state) => state.categories);
  const [data, setData] = useState({
    categoryName: "",
    name: "",
    color: "",
  });
  const [nameError, setNameError] = useState("");
  const [colorError, setColorError] = useState("");
  const [categoryError, setCategoryError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFocus = (e) => {
    e.target.value = "";
  };
  const handleBlur = (e) => {
    if (e.target.name === "name" && data.name.trim() === "") setNameError("Error: required field");
    else setNameError("");
    if (e.target.name === "color" && data.color.trim() === "") setColorError("Error: required field");
    else setColorError("");
    if (e.target.name === "categoryName" && data.categoryName.trim() === "") setCategoryError("Error: required field");
    else setCategoryError("");
  };
  const handleCreateSubcategory = async (e) => {
    e.preventDefault();

    const wasSuccess = await createSubcategory(data);
    if (!wasSuccess) return;

    const { user } = await checkAuthStatus();
    setAllMoneyState(dispatch, user);
    setData({
      categoryName: "",
      name: "",
      color: "",
    });
  };
  return (
    <DialogCustom
      onClick={handleCreateSubcategory}
      title="Create Subcategory"
      icon={
        <>
          <AddCircleOutlineIcon /> Add Subcategory{" "}
        </>
      }
      //   isError={error}
    >
      <Input
        name="categoryName"
        label={categoryError ? categoryError : "Category *"}
        value={data.categoryName}
        // placeholder="Choose category ..."
        list="datalist-categories"
        options={categories}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Input
        id="name"
        onChange={handleChange}
        name="name"
        value={data.name}
        label={nameError ? nameError : "Subcategory Name"}
        onBlur={handleBlur}
      />
      <Input
        id="color"
        type="color"
        onChange={handleChange}
        name="color"
        value={data.color}
        label={colorError ? colorError : "Subcategory Color"}
        onBlur={handleBlur}
      />
    </DialogCustom>
  );
}

// <DialogCustom onClick={handleUpdateTransaction} title="Edit Transaction" icon={<EditIcon />} isError={error}>
