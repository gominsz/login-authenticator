const jwt = require("jsonwebtoken");
const { getUserByEmail, validatePassword } = require("./users");

const secretKey = "my-secret-key";

const authenticateUser = async (email, password) => {
  const user = getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await validatePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
  return { token };
};

const authorizeUser = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    try {
      const decodedToken = jwt.verify(token, secretKey);
      if (decodedToken.role !== role) {
        throw new Error("Unauthorized");
      }
      req.user = decodedToken;
      next();
    } catch (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  };
};
