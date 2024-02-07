export const notFound = (req, res, next) => {
  res.status(404).json({
    message: "404 Not Found",
  });
  next();
};
