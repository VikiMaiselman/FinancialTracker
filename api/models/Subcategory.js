import Subcategory from "./SubcategorySchema.js";
import User from "./UserSchema.js";

export const createSubcategoryObject = (name, color) => {
  return new Subcategory({
    name: name,
    color: color,
  });
};

export const createSubcategoryForUser = async (name, color, userId, categoryName) => {
  try {
    const newSubcat = createSubcategoryObject(name, color);

    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { "categories.$[category].subcategories": newSubcat } },
      { arrayFilters: [{ "category.name": categoryName }] }
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json("Could not create the category. Try again later or contact the support.");
  }
};

export const deleteSubcategoryFromUser = async (userId, subcatId) => {
  try {
    await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { "categories.$.subcategories": { _id: subcatId } } }
      // { $pull: { "categories.$[category].subcategories": { _id: subcatId } } },
      // { arrayFilters: [{ "category.name": categoryName }] }
    );
  } catch (error) {
    console.error(error);
    return res.status(400).json("Could not delete the category. Try again later or contact the support.");
  }
};

export const findSubcategoryByName = async (userId, categoryName, subcategoryName) => {
  try {
    const user = await User.findOne({ _id: userId });
    const category = user.categories.find((c) => c.name === categoryName);
    const subcategory = category.subcategories.find((s) => s.name === subcategoryName);

    if (!subcategory) throw new Error("There was no such subcategory found associated with this user.");
    return subcategory;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
