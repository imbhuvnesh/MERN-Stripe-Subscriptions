export const isAuth = function () {
  if (localStorage.getItem("auth")) {
    return localStorage.getItem("auth");
  }
  return "";
};

