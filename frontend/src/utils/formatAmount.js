export const formatAmount = (amount) => {
  return (amount / 100).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });
};
