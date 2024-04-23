import axios from "axios";

import { URL, HEADERS } from "./config.js";

export async function signUp(data) {
  try {
    const result = await axios.post(`${URL}/sign-up`, data, { withCredentials: true }, HEADERS);
    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
    // let cancelText = "Try again.";
    // if (error.response?.data?.message?.startsWith?.("TWILIO:") || error.response?.data?.startsWith?.("TWILIO:")) {
    //   cancelText = "Authenticate w/o OTP (this will still be safe)";
    // }
    // Swal.fire({
    //   title: "Ooops...",
    //   text: error.response.data.message || error.response.data,
    //   icon: "error",
    //   confirmButtonText: cancelText,
    //   confirmButtonColor: middleBlue,
    //   color: darkBlue,
    //   iconColor: "red",
    // }).then(() => {
    //   isTwilioError = true;
    // });
    // return "isTwilioError";
  }
}

export async function verifyUser(fullData) {
  try {
    const result = await axios.post(`${URL}/verification`, fullData, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    // Swal.fire({
    //   title: "Ooops...",
    //   text: error.response.data,
    //   icon: "error",
    //   confirmButtonText: "Please, try again.",
    //   confirmButtonColor: middleBlue,
    //   color: darkBlue,
    //   iconColor: "red",
    // });
  }
}

export async function logout() {
  try {
    await axios.get(`${URL}/logout`, { withCredentials: true }, HEADERS);
  } catch (error) {
    console.error(error);
    //     Swal.fire({
    //       title: "Ooops...",
    //       text: "We could not log you out.",
    //       icon: "error",
    //       confirmButtonText: "Please, return to home page and try again.",
    //       confirmButtonColor: middleBlue,
    //       color: darkBlue,
    //       iconColor: "red",
    //     });
  }
}

export async function checkAuthStatus() {
  try {
    const result = await axios.get(`${URL}/auth-status`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);

    // Swal.fire({
    //   title: "Ooops...",
    //   text: "We could not check your authentication status.",
    //   icon: "error",
    //   confirmButtonText: "Please, try again.",
    //   confirmButtonColor: middleBlue,
    //   color: darkBlue,
    //   iconColor: "red",
    // });
  }
}

export async function getBalance() {
  try {
    const result = await axios.get(`${URL}/balance`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCategories() {
  try {
    const result = await axios.get(`${URL}/categories`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllTransactions() {
  try {
    const result = await axios.get(`${URL}/transactions`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createTransaction(tx) {
  //   const { name, amount, categoryName, subcategoryName, date } = req.body;
  try {
    const result = await axios.post(`${URL}/transaction`, tx, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function updateTransaction(updatedFields) {
  try {
    const result = await axios.patch(`${URL}/update-transaction`, updatedFields, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTransaction(txId) {
  try {
    const result = await axios.post(
      `${URL}/delete-transaction`,
      { transactionId: txId },
      { withCredentials: true },
      HEADERS
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function createSubcategory(subcategory) {
  //     const { name, color, categoryName, subcategoryName } = req.body;
  try {
    const result = await axios.post(`${URL}/subcat`, subcategory, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteSubcategory(subcatId) {
  //   const { name, amount, categoryName, subcategoryName, date } = req.body;
  try {
    const result = await axios.post(`${URL}/delete-subcat`, { subcatId: subcatId }, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
