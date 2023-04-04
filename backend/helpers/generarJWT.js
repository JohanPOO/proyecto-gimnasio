import jwt from "jsonwebtoken";

export const generarJWT = (id) => {
  return jwt.sign({ id }, "secret", {
    expiresIn: "1h",
  });
};

export const verificarJWT = (token) => {
  return jwt.verify(token, "secret");
};
