import Category from "./CategorySchema.js";
import User from "./UserSchema.js";
import { createSubcategoryObject } from "./Subcategory.js";

export const createCategoryObject = (categoryName, subcategories) => {
  return new Category({
    name: categoryName,
    subcategories: subcategories,
    total: 0,
  });
};

export const createDefaultCategoriesForUser = async (userId) => {
  const expenses = createExpensesCategory();
  const incomes = createIncomesCategory();
  const savings = createSavingsCategory();
  try {
    await User.findOneAndUpdate({ _id: userId }, { $push: { categories: { $each: [expenses, incomes, savings] } } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createSubcategoryForUser = async (userId) => {
  try {
    await User.findOneAndUpdate({ _id: userId }, { $push: { categories: { $each: [expenses, incomes, savings] } } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const createExpensesCategory = () => {
  const food = createSubcategoryObject("Food&Drinks", "#C8AE7D");
  const housing = createSubcategoryObject("Rent/Mortgage", "#65451F");
  const bills = createSubcategoryObject("Bills", "#6C3428");
  const transport = createSubcategoryObject("Transport", "#186F65");
  const beauty = createCategoryObject("Beauty", "#BA704F");
  const health = createCategoryObject("Health&Sports", "#DFA878");
  const miscellaneous = createCategoryObject("Miscellaneous", "#DFA878");
  const gifts = createCategoryObject("Gifts", "#FF9B50");
  const entertainment = createCategoryObject("Entertainment", "#765827");
  const wishes = createCategoryObject("My Wishes", "#3F4E4F");

  return createCategoryObject("Expenses", [
    food,
    entertainment,
    housing,
    bills,
    transport,
    beauty,
    health,
    miscellaneous,
    gifts,
    wishes,
  ]);
};

const createIncomesCategory = () => {
  const salary = createSubcategoryObject("Salary", "#5F6F52");
  const other = createSubcategoryObject("Other Incomes", "#A9B388");
  return createCategoryObject("Incomes", [salary, other]);
};

const createSavingsCategory = () => {
  const generalSavings = createSubcategoryObject("General Savings", "#EAC696");
  const savingsForWishes = createSubcategoryObject("Savings for Wishes", "#483434");
  return createCategoryObject("Savings", [generalSavings, savingsForWishes]);
};
