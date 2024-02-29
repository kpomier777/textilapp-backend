import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { responseTemplate } from "../helpers/response.js";
import { db } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET || "--";

const userRegistered = async (username) => {
  try {
    const query = "SELECT * FROM user WHERE username = ?";
    const [rows] = await db.query(query, [username]);

    if (rows.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    res.status(500).json(
      responseTemplate({
        message: error.message,
      })
    );
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isRegistered = await userRegistered(username);
    if (isRegistered) {
      return res.send(
        responseTemplate({
          message: "Este Usuario ya esta registrado",
        })
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = "INSERT INTO user (username, password) VALUES (?, ?)";
    const [rows] = await db.query(query, [username, hashedPassword]);
    const userInsertId = rows.insertId;
    // Generar un token JWT
    const token = jwt.sign({ userId: userInsertId }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.send(
      responseTemplate({
        status: true,
        message: "Usuario: registrado con éxito",
        data: {
          id: userInsertId,
          username,
          token,
        },
      })
    );
  } catch (error) {
    res.status(500).json(
      responseTemplate({
        message: error.message,
      })
    );
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const query = "SELECT * FROM user WHERE username = ?";
    const [rows] = await db.query(query, [username]);

    if (rows.length === 0) {
      return res.send(
        responseTemplate({
          message: "Credenciales incorrectas",
        })
      );
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.send(
        responseTemplate({
          message: "Credenciales incorrectas",
        })
      );
    }

    // Generar un token JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.send(
      responseTemplate({
        status: true,
        message: "Usuario: autenticado con éxito",
        data: {
          id: user.id,
          username: user.username,
          token,
        },
      })
    );
  } catch (error) {
    res.status(500).json(
      responseTemplate({
        message: error.message,
      })
    );
  }
};
