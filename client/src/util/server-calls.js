import axios from "axios";
import Swal from "sweetalert2";

import { URL, HEADERS } from "./config.js";
import { fireAlert } from "./helpers.js";

export async function signUp(data) {
  try {
    const result = await axios.post(`${URL}/sign-up`, data, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    let cancelText = "Try again.";
    if (
      error.response?.data?.message?.startsWith?.("TWILIO:") ||
      error.response?.data?.error?.startsWith?.("TWILIO:")
    ) {
      cancelText = "Authenticate w/o OTP (this will still be safe)";
    }
    // fireAlert("There was an internal problem with Twilio Validation", true);
    // return false;
    return Swal.fire({
      title: "Ooops...",
      text: error.response.data?.message || error.response.data?.error,
      icon: "error",
      confirmButtonText: cancelText,
      confirmButtonColor: "rgb(68 64 60)",
      color: "color: rgb(168 162 158)",
      iconColor: "red",
    });
  }
}

export async function verifyUser(fullData) {
  try {
    const result = await axios.post(`${URL}/verification`, fullData, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return;
  }
}

export async function logout() {
  try {
    await axios.get(`${URL}/logout`, { withCredentials: true }, HEADERS);
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return;
  }
}

export async function checkAuthStatus() {
  try {
    const result = await axios.get(`${URL}/auth-status`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return;
  }
}

export async function getBalance() {
  try {
    const result = await axios.get(`${URL}/balance`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return;
  }
}

export async function getCategories() {
  try {
    const result = await axios.get(`${URL}/categories`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return;
  }
}

export async function getAllTransactions() {
  try {
    const result = await axios.get(`${URL}/transactions`, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return false;
  }
}

export async function createTransaction(tx) {
  try {
    const result = await axios.post(`${URL}/transaction`, tx, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return false;
  }
}

export async function updateTransaction(updatedFields) {
  try {
    const result = await axios.patch(`${URL}/update-transaction`, updatedFields, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return false;
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
    fireAlert(error.response.data.error, true);
    return false;
  }
}

export async function createSubcategory(subcategory) {
  try {
    const result = await axios.post(`${URL}/subcat`, subcategory, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return false;
  }
}

export async function deleteSubcategory(subcatId) {
  try {
    const result = await axios.post(`${URL}/delete-subcat`, { subcatId: subcatId }, { withCredentials: true }, HEADERS);
    return result.data;
  } catch (error) {
    console.error(error);
    fireAlert(error.response.data.error, true);
    return false;
  }
}
