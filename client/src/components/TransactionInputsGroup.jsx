import Input from "./Input";
import { UTCtoGMT } from "../util/helpers";

export default function TransactionInputsGroup({ transaction, categories, setState, isUpdate = false }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category" || name === "subcategory") e.target.blur();
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleFocus = (e) => {
    e.target.value = "";
  };

  let date;
  if (transaction.date.toString().endsWith("Z")) {
    date = UTCtoGMT(transaction.date);
  } else {
    date = UTCtoGMT(transaction.date.toISOString());
  }
  const formattedDate = new Date(date).toISOString().split("T")[0];

  return (
    <>
      <Input name="name" value={transaction.name} placeholder="Name/purpose ..." onChange={handleChange} />
      <Input
        name="amount"
        type="number"
        value={transaction.amount}
        placeholder="Amount (in ILS) ..."
        onChange={handleChange}
      />
      <Input
        name="category"
        value={transaction.category}
        placeholder="Choose category ..."
        list="datalist-categories"
        options={categories}
        onChange={handleChange}
        onFocus={handleFocus}
        disabled={isUpdate}
      />
      <Input
        name="subcategory"
        value={transaction.subcategory}
        placeholder="Choose subcategory ..."
        list="datalist-subcategories"
        options={categories?.find((c) => c.name === transaction.category)?.subcategories}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <Input name="date" type="date" value={formattedDate} onChange={handleChange} />
    </>
  );
}
