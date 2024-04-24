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
  console.log(user.categories);
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

export const setAllMoneyState = (fn, user) => {
  setBalanceState(fn, user);
  setTransactionsState(fn, user);
  setCategoriesState(fn, user);
};

export const UTCtoGMT = (inputDateString) => {
  const dateObject = new Date(inputDateString);
  const timeZoneOffsetInMinutes = dateObject.getTimezoneOffset();

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dayOfWeek = daysOfWeek[dateObject.getUTCDay()];
  const month = months[dateObject.getUTCMonth()];
  const day = dateObject.getUTCDate();
  const year = dateObject.getUTCFullYear();
  const hours = dateObject.getUTCHours();
  const minutes = ("0" + dateObject.getUTCMinutes()).slice(-2);
  const seconds = ("0" + dateObject.getUTCSeconds()).slice(-2);

  // Convert the offset to hours and minutes format
  const sign = timeZoneOffsetInMinutes > 0 ? "+" : "-";
  const hoursOffset = Math.floor(Math.abs(timeZoneOffsetInMinutes) / 60);
  const minutesOffset = ("0" + (Math.abs(timeZoneOffsetInMinutes) % 60)).slice(-2);
  const timeZoneOffset = sign + ("0" + hoursOffset).slice(-2) + minutesOffset;

  // Construct the formatted date string
  const formattedDateString =
    dayOfWeek +
    " " +
    month +
    " " +
    day +
    " " +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds +
    " GMT" +
    timeZoneOffset +
    " (Israel Daylight Time)";

  return formattedDateString;
};

export const fireAlert = (text, isErrorAlert) => {
  Swal.fire({
    title: "Ooops...",
    text: text,
    icon: isErrorAlert ? "error" : "success",
    confirmButtonText: "Please, try again.",
    confirmButtonColor: "rgb(68 64 60)",
    color: "color: rgb(168 162 158)",
    iconColor: isErrorAlert ? "red" : "green",
  });
};
