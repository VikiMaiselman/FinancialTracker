import axios from "axios";

import Swal from "sweetalert2";

export function composeDataForBackend(userData, activeTab, useTwilio = true) {
  return {
    ...userData,
    username: userData.email,
    phone: `+${userData.phone}`,
    action: `${activeTab === 0 ? "signup" : "login"}`,
    useTwilio: useTwilio,
  };
}

export function filterTransactionsPerSubcategory(currentCategory, currentTransactions) {
  return currentCategory.subcategories
    .map((s) => {
      const subcategoryTxs = currentTransactions.filter((tx) => tx.subcategory === s.name);
      const subcategoryTotal = subcategoryTxs.reduce((acc, tx) => acc + tx.amount, 0);

      if (subcategoryTotal === 0) return {};
      return {
        key: s._id,
        name: s.name,
        subcategoryTotal: subcategoryTotal,
        fill: s.color,
      };
    })
    .filter((element) => {
      return element.key !== undefined;
    });
}

export const setUserAuthState = (fn, user, isAuthenticated) => {
  fn({
    type: "SET_USER",
    payload: {
      username: user.username,
      isAuthenticated: isAuthenticated,
      isBeingVerified: false,
      id: user._id,
    },
  });
};

export const setUserNotAuthState = (fn, isAuthenticated) => {
  fn({
    type: "SET_USER",
    payload: {
      isAuthenticated: isAuthenticated,
    },
  });
};

export const setBalanceState = (fn, user) => {
  fn({
    type: "SET_BALANCE",
    payload: user.balance,
  });
};

export const setTransactionsState = (fn, user) => {
  fn({
    type: "SET_TXS",
    payload: user.transactions,
  });
};

export const setCategoriesState = (fn, user) => {
  fn({
    type: "SET_CATEGORIES",
    payload: user.categories,
  });
};

export const setAllState = (fn, user, isAuthenticated) => {
  setUserAuthState(fn, user, isAuthenticated);
  setBalanceState(fn, user);
  setTransactionsState(fn, user);
  setCategoriesState(fn, user);
};
