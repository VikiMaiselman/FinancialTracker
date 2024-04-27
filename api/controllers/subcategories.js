import { createSubcategoryForUser, deleteSubcategoryFromUser, findSubcategoryByName } from "../models/Subcategory.js";

export const createSubcategory = async (req, res) => {
  const { name, color, categoryName } = req.body;
  try {
    const subcategory = await findSubcategoryByName(req.user._id, categoryName, name);
    if (subcategory) throw new Error("Subcategory already exists.");
    await createSubcategoryForUser(name, color, req.user._id, categoryName);
    return res.send("Subcategory successfully created.");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Could not create the subcategory. " + error.message });
  }
};

export const deleteSubcategory = async (req, res) => {
  const { subcatId } = req.body;
  try {
    await deleteSubcategoryFromUser(req.user._id, subcatId);
    return res.send("Subcategory successfully deleted.");
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Could not delete the subcategory" });
  }
};
