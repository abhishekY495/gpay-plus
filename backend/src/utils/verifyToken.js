import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const _id = jwt.verify(token, process.env.JWT_SECRET);
    return _id;
  } catch (error) {
    return false;
  }
};
