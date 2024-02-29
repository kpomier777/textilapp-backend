import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData } from "../helpers/list-handler.js";

export const createTitle = async (req, res) => {
  try {
    const { name, description } = req.body;

    const query = "INSERT INTO title (name, description) VALUES (?, ?)";
    const [rows] = await db.query(query, [name, description]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Titulo: registrado con éxito",
        data: {
          titleId: lastInsertId,
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

export const updateTitle = async (req, res) => {
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

    const query = `UPDATE title SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE title.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Titulo: actualizado con éxito",
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

export const getTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM title WHERE id=?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Titulo: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Titulo: encontrado con éxito",
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

export const getTitles = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "title",
        orderKey: "id",
        searchColumns: ["name", "description"],
      },
    });

    return res.send({
      ...responseTemplate({
        status: true,
        message: "Titulo: listado encontrado",
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
