import Input from "./elements/Input";
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

  let date = transaction.date;
  console.log(transaction.date);
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
        label="Name *"
        value={transaction.name}
        placeholder="Name/purpose ..."
        onChange={handleChange}
      />
      <Input
        name="amount"
        label="Amount *"
        type="number"
        value={transaction.amount}
        placeholder="Amount (in ILS) ..."
        onChange={handleChange}
      />
      <Input
        name="category"
        label="Category *"
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
        label="Subcategory *"
        value={transaction.subcategory}
        placeholder="Choose subcategory ..."
        list="datalist-subcategories"
        options={categories?.find((c) => c.name === transaction.category)?.subcategories}
        onChange={handleChange}
        onFocus={handleFocus}
      />
      <Input name="date" label="Date *" type="date" value={formattedDate} onChange={handleChange} />
    </>
  );
}
