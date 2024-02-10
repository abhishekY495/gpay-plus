import jwt from "jsonwebtoken";

export const generateToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return `Bearer ${token}`;
};
