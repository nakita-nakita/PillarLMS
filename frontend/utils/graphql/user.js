// import { cookies } from "next/headers";

// export const user = {};

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export const setUserToken = ({ token }) => {
  document.cookie = `authToken=${token}; path=/`
}

export const getUserToken = () => {
  return getCookie('authToken')
}