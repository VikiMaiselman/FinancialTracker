import { useState } from "react";
import { useSelector } from "react-redux";

import DialogCustom from "./elements/DialogCustom";
import Input from "./elements/Input";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import { checkAuthStatus, createSubcategory, deleteSubcategory } from "../util/server-calls";
import { setAllMoneyState } from "../util/helpers";

export default function DeleteSubcategory() {
  const categories = useSelector((state) => state.categories);
  const [data, setData] = useState({
    subcategory: "",
    category: "",
  });
  const [subcatIdError, setSubcatIdError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData((prevSt) => ({ ...prevSt, [name]: value }));
  };
  const handleFocus = (e) => {
    e.target.value = "";
  };
  const handleBlur = (e) => {
    // if (e.target.name === "name" && data.name.trim() === "") setNameError("Error: required field");
    // else setNameError("");
    // if (e.target.name === "color" && data.color.trim() === "") setColorError("Error: required field");
    // else setColorError("");
    // if (e.target.name === "categoryName" && data.categoryName.trim() === "") setCategoryError("Error: required field");
    // else setCategoryError("");
  };
  const handleDeleteSubcategory = async (e) => {
    e.preventDefault();

    const subcat = categories
      ?.find((c) => c.name === data.category)
      ?.subcategories.find((s) => s.name === data.subcategory);

    console.log(subcat._id);

    const wasSuccess = await deleteSubcategory(subcat._id);
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
      onClick={handleDeleteSubcategory}
      title="Delete Subcategory"
      icon={
        <>
          <AddCircleOutlineIcon /> Manage Subcategories
        </>
      }
    >
      <Input
        name="category"
        // label={categoryError ? categoryError : "Category *"}
        label={"Category"}
        value={data.category}
        list="datalist-categories"
        options={categories}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Input
        name="subcategory"
        // label={categoryError ? categoryError : "Category *"}
        label={"Subcategory"}
        value={data.subcategory}
        list="datalist-subcategories"
        options={categories?.find((c) => c.name === data.category)?.subcategories}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </DialogCustom>
  );
}

// <DialogCustom onClick={handleUpdateTransaction} title="Edit Transaction" icon={<EditIcon />} isError={error}>
