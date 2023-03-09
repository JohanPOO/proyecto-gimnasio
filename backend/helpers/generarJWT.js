import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "1h",
  });
};

export default generarJWT;
