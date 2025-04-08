import { getEvasByProvince } from "./handlers";

export const preloadData = () => {
    const storedVerification = sessionStorage.getItem("isVerified");
    if (storedVerification === "true") {
      getEvasByProvince("Mendoza").catch(() => {});
    }
  };