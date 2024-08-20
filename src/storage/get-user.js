import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token_access
  if (token) {
    const user = jwtDecode(token);
    return user
  }
  return
}