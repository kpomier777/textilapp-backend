import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import 'dotenv/config';
/* Routes */
import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/client.routes.js";
import areaRoutes from "./routes/area.routes.js";
import titleRoutes from "./routes/title.routes.js";
import colorRoutes from "./routes/color.routes.js";
import turnRoutes from "./routes/turn.routes.js";
import occupationRoutes from "./routes/occupation.routes.js";
import operatorRoutes from "./routes/operator.routes.js";
import productRoutes from "./routes/product.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

/* Middlewares */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Routes */
app.use("/health", (req, res) => res.send("textilapp api"));
app.use("/auth", authRoutes);
app.use("/clients", clientRoutes);
app.use("/areas", areaRoutes);
app.use("/titles", titleRoutes);
app.use("/colors", colorRoutes);
app.use("/turns", turnRoutes);
app.use("/occupations", occupationRoutes);
app.use("/operators", operatorRoutes);
app.use("/products", productRoutes);

/* Server */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});
