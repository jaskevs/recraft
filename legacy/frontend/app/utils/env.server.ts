export const getEnv = () => {
  return {
    DIRECTUS_URL: process.env.DIRECTUS_URL || "http://localhost:8055",
  };
};
