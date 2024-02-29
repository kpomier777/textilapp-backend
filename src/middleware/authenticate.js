import jwt from "jsonwebtoken";
import { responseTemplate } from "../helpers/response.js";
const JWT_SECRET = process.env.JWT_SECRET || "--";

export function authenticate(req, res, next) {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json(
      responseTemplate({
        status: false,
        message: "Token caducado",
        data: {
          token: null,
        },
      })
    );
  }
}
