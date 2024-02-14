export const formatDate = (userDate) => {
  const date = new Date(userDate);
  const options = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleTimeString("en-US", options);
};
