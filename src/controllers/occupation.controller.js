import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData, buildInnerJoin } from "../helpers/list-handler.js";

export const createOccupation = async (req, res) => {
  try {
    const { name, id_turn } = req.body;

    const query = "INSERT INTO occupation (name, id_turn) VALUES (?, ?)";
    const [rows] = await db.query(query, [name, id_turn]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Ocupación: registrado con éxito",
        data: {
          occupationId: lastInsertId,
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

export const updateOccupation = async (req, res) => {
  try {
    const { id, name, id_turn } = req.body;

    let sqlParams = [];
    let sqlParamsValue = [];

    if (checkValueNotUndefined(name)) {
      sqlParams.push("name = ?");
      sqlParamsValue.push(name);
    }
    if (checkValueNotUndefined(id_turn)) {
      sqlParams.push("id_turn = ?");
      sqlParamsValue.push(id_turn);
    }

    sqlParamsValue.push(id);

    const query = `UPDATE occupation SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE occupation.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Ocupación: actualizado con éxito",
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

export const getOccupation = async (req, res) => {
  try {
    const { id } = req.params;
    const innerJoinQuery = buildInnerJoin([
      {
        table: 'turn',
        tableId: 'id',
        tableJoin: 'occupation',
        tableJoinId: 'id_turn'
      }
    ])
    const selectColumns = `
      occupation.id,
      occupation.name,
      occupation.id_turn,
      turn.name as turnName,
      turn.start_time,
      turn.end_time,
      occupation.created_at,
      occupation.updated_at
    `
    const query = `SELECT ${selectColumns} FROM occupation ${innerJoinQuery} WHERE occupation.id=?`;
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Ocupación: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Ocupación: encontrado con éxito",
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

export const getOccupations = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "occupation",
        orderKey: "id",
        searchColumns: ["name"],
        selectColumns: `
          occupation.id,
          occupation.name,
          turn.name as turnName,
          turn.start_time,
          turn.end_time,
          occupation.created_at,
          occupation.updated_at
        `,
        innerJoin: [
          {
            table: 'turn',
            tableId: 'id',
            tableJoin: 'occupation',
            tableJoinId: 'id_turn'
          }
        ]
      },
    });

    return res.send({
      ...responseTemplate({
        status: true,
        message: "Ocupación: listado encontrado",
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
