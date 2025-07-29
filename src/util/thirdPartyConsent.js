import Cookies from "js-cookie";

export function checkConsent() {
  const cookie = Cookies.get("cc_cookie");
  if (!cookie) {
    return false;
  }
  const data = JSON.parse(cookie);
  return data.categories.includes("thirdPartyContent");
}
