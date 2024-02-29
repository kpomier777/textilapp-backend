import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData } from "../helpers/list-handler.js";

export const createArea = async (req, res) => {
  try {
    const { name, description } = req.body;

    const query = "INSERT INTO area (name, description) VALUES (?, ?)";
    const [rows] = await db.query(query, [name, description]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Area: registrado con éxito",
        data: {
          areaId: lastInsertId,
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

export const updateArea = async (req, res) => {
  try {
    const { id, name, description } = req.body;

    let sqlParams = [];
    let sqlParamsValue = [];

    if (checkValueNotUndefined(name)) {
      sqlParams.push("name = ?");
      sqlParamsValue.push(name);
    }
    if (checkValueNotUndefined(description)) {
      sqlParams.push("description = ?");
      sqlParamsValue.push(description);
    }

    sqlParamsValue.push(id);

    const query = `UPDATE area SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE area.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Area: actualizado con éxito",
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

export const getArea = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM area WHERE id=?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Area: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Area: encontrado con éxito",
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

export const getAreas = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "area",
        orderKey: "id",
        searchColumns: ["name", "description"],
      },
    });

    return res.send({
      ...responseTemplate({
        status: true,
        message: "Area: listado encontrado",
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
