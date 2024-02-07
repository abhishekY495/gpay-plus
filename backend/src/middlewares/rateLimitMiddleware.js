let numberOfRequestsPerIp = {};

setInterval(() => {
  numberOfRequestsPerIp = {};
}, 1000);

export const rateLimit = (req, res, next) => {
  const ip = req.socket.remoteAddress;
  if (numberOfRequestsPerIp[ip]) {
    numberOfRequestsPerIp[ip]++;
    if (numberOfRequestsPerIp[ip] > 5) {
      res.status(400).json({ message: "Bass kar bhai" });
    } else {
      next();
    }
  } else {
    numberOfRequestsPerIp[ip] = 1;
    next();
  }
};
