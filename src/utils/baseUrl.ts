export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://resource-sharer.onrender.com"
    : "http://localhost:4000";

export const frontEndUrl =
  process.env.NODE_ENV === "production"
    ? "https://resource-sharer.netlify.app/"
    : "http://localhost:3000";
