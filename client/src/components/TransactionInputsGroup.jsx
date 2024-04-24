import Input from "./elements/Input";
import { UTCtoGMT } from "../util/helpers";
import { useState } from "react";

export default function TransactionInputsGroup({ transaction, categories, setState, setErrorState, isUpdate = false }) {
  const [errors, setErrors] = useState({
    name: "",
    amount: "",
    category: "",
    subcategory: "",
    date: "",
  });

  const validate = (fieldName, value) => {
    if (value.trim() === "") {
      setErrors((prevSt) => ({ ...prevSt, [fieldName]: "Please, don't leave this field empty" }));
      setErrorState(true);
      return;
    }
    setErrors((prevSt) => ({ ...prevSt, [fieldName]: "" }));
    if (!errors.name && !errors.amount && !errors.category && !errors.subcategory && !errors.data) setErrorState(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" || name === "subcategory") e.target.blur();
    setState((prevState) => ({ ...prevState, [name]: value }));
    validate(name, value);
  };
  const handleFocus = (e) => {
    e.target.value = "";
  };
  const handleBlur = (name, value) => {
    validate(name, value);
  };
  const handleKeyDown = (e) => {
    e.preventDefault();
  };

  let date = transaction.date;
  if (transaction.date?.toString().endsWith("Z")) {
    date = UTCtoGMT(transaction.date);
  } else if (transaction.date?.toString().endsWith("Time)")) {
    date = UTCtoGMT(transaction.date?.toISOString());
  }
  const formattedDate = new Date(date).toISOString().split("T")[0];

  return (
    <>
      <Input
        name="name"
        label={errors.name ? `Error: ${errors.name}` : "Name *"}
        value={transaction.name}
        placeholder="Name/purpose ..."
        onChange={handleChange}
        onBlur={() => handleBlur("name", transaction.name)}
      />
      <Input
        name="amount"
        label={errors.amount ? `Error: ${errors.amount}` : "Amount *"}
        type="number"
        value={transaction.amount}
        placeholder="Amount (in ILS) ..."
        onChange={handleChange}
        onBlur={() => handleBlur("amount", transaction.amount)}
      />
      <Input
        name="category"
        label={errors.category ? `Error: ${errors.category}` : "Category *"}
        value={transaction.category}
        placeholder="Choose category ..."
        list="datalist-categories"
        options={categories}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={() => handleBlur("category", transaction.category)}
        // onKeyDown={handleKeyDown}
        disabled={isUpdate}
      />
      <Input
        name="subcategory"
        label={errors.subcategory ? `Error: ${errors.subcategory}` : "Subcategory *"}
        value={transaction.subcategory}
        placeholder="Choose subcategory ..."
        list="datalist-subcategories"
        options={categories?.find((c) => c.name === transaction.category)?.subcategories}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={() => handleBlur("subcategory", transaction.subcategory)}
      />
      <Input
        name="date"
        label={errors.date ? `Error: ${errors.date}` : "Date *"}
        type="date"
        value={formattedDate}
        onChange={handleChange}
        onBlur={() => handleBlur("date", transaction.date)}
      />
    </>
  );
}
