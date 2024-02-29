import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData } from "../helpers/list-handler.js";

export const createColor = async (req, res) => {
  try {
    const { cod_color, name, description } = req.body;

    const query =
      "INSERT INTO color (cod_color, name, description) VALUES (?, ?, ?)";
    const [rows] = await db.query(query, [cod_color, name, description]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Color: registrado con éxito",
        data: {
          colorId: lastInsertId,
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

export const updateColor = async (req, res) => {
  try {
    const { id, cod_color, name, description } = req.body;

    let sqlParams = [];
    let sqlParamsValue = [];

    if (checkValueNotUndefined(cod_color)) {
      sqlParams.push("cod_color = ?");
      sqlParamsValue.push(cod_color);
    }
    if (checkValueNotUndefined(name)) {
      sqlParams.push("name = ?");
      sqlParamsValue.push(name);
    }
    if (checkValueNotUndefined(description)) {
      sqlParams.push("description = ?");
      sqlParamsValue.push(description);
    }

    sqlParamsValue.push(id);

    const query = `UPDATE color SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE color.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Color: actualizado con éxito",
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

export const getColor = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM color WHERE id=?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Color: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Color: encontrado con éxito",
        data: {
          ...rows[0],
        },
      })
    );
  } catch (error) {
    return res.send(
      responseTemplate({
        message: error.message,
      })
    );
  }
};

export const getColors = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "color",
        orderKey: "id",
        searchColumns: ["cod_color", "name", "description"],
      },
    });

    return res.send({
      ...responseTemplate({
        status: true,
        message: "Color: listado encontrado",
        data: resultList.rows,
      }),
      pagination: resultList.pagination,
    });
  } catch (error) {
    return res.send(
      responseTemplate({
        message: error.message,
      })
    );
  }
};
