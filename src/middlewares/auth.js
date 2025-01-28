export const authVerification = (req, res, next) => {
  const authtoken = req.headers.authorization?.split(" ")[1];
  if (authtoken === "xyz") {
    next();
  } else {
    res.status(401).send("User not authorised");
  }
};

export const userAuth = (req, res, next) => {
  const authtoken = req.headers.authorization?.split(" ")[1];
  if (authtoken === "abc") {
    next();
  } else {
    res.status(401).send("User not authorised");
  }
};
