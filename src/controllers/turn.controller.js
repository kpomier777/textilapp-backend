import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData } from "../helpers/list-handler.js";

export const createTurn = async (req, res) => {
  try {
    const { name, start_time, end_time } = req.body;

    const query = "INSERT INTO turn (name, start_time, end_time) VALUES (?, ?, ?)";
    const [rows] = await db.query(query, [name, start_time, end_time]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Turno: registrado con éxito",
        data: {
          turnId: lastInsertId,
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

export const updateTurn = async (req, res) => {
  try {
    const { id, name, start_time, end_time } = req.body;

    let sqlParams = [];
    let sqlParamsValue = [];

    if (checkValueNotUndefined(name)) {
      sqlParams.push("name = ?");
      sqlParamsValue.push(name);
    }
    if (checkValueNotUndefined(start_time)) {
      sqlParams.push("start_time = ?");
      sqlParamsValue.push(start_time);
    }
    if (checkValueNotUndefined(end_time)) {
      sqlParams.push("end_time = ?");
      sqlParamsValue.push(end_time);
    }

    sqlParamsValue.push(id);

    const query = `UPDATE turn SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE turn.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Turno: actualizado con éxito",
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

export const getTurn = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM turn WHERE id=?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Turno: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Turno: encontrado con éxito",
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

export const getTurns = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "turn",
        orderKey: "id",
        searchColumns: ["name", "start_time", 'end_time'],
      },
    });

    return res.send({
      ...responseTemplate({
        status: true,
        message: "Turno: listado encontrado",
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
