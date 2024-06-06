export const getUserInfo = () => {
  const userStorage = localStorage.getItem("user");
  return userStorage ? JSON.parse(userStorage) : null;
};
