import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData, buildInnerJoin } from "../helpers/list-handler.js";

export const createOperator = async (req, res) => {
  try {
    const { cod_operator, first_name, last_name, cellphone, id_occupation } = req.body;

    const query = "INSERT INTO operator (cod_operator, first_name, last_name, cellphone, id_occupation) VALUES (?, ?, ?, ?, ?)";
    const [rows] = await db.query(query, [cod_operator, first_name, last_name, cellphone, id_occupation]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Operador: registrado con éxito",
        data: {
          operatorId: lastInsertId,
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

export const updateOperator = async (req, res) => {
  try {
    const { id, cod_operator, first_name, last_name, cellphone, id_occupation } = req.body;

    let sqlParams = [];
    let sqlParamsValue = [];

    if (checkValueNotUndefined(cod_operator)) {
      sqlParams.push("cod_operator = ?");
      sqlParamsValue.push(cod_operator);
    }
    if (checkValueNotUndefined(first_name)) {
      sqlParams.push("first_name = ?");
      sqlParamsValue.push(first_name);
    }
    if (checkValueNotUndefined(last_name)) {
      sqlParams.push("last_name = ?");
      sqlParamsValue.push(last_name);
    }
    if (checkValueNotUndefined(cellphone)) {
      sqlParams.push("cellphone = ?");
      sqlParamsValue.push(cellphone);
    }
    if (checkValueNotUndefined(id_occupation)) {
      sqlParams.push("id_occupation = ?");
      sqlParamsValue.push(id_occupation);
    }

    sqlParamsValue.push(id);

    const query = `UPDATE operator SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE operator.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Operador: actualizado con éxito",
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

export const getOperator = async (req, res) => {
  try {
    const { id } = req.params;
    const innerJoinQuery = buildInnerJoin([
      {
        table: 'occupation',
        tableId: 'id',
        tableJoin: 'operator',
        tableJoinId: 'id_occupation'
      },
      {
        table: 'turn',
        tableId: 'id',
        tableJoin: 'occupation',
        tableJoinId: 'id_turn'
      }
    ])
    const selectColumns = `
      operator.id,
      operator.cod_operator,
      operator.first_name,
      operator.last_name,
      operator.cellphone,
      occupation.id as occupationId,
      occupation.name as occupationName,
      turn.name as turnName,
      turn.start_time,
      turn.end_time,
      operator.created_at,
      operator.updated_at
    `
    const query = `SELECT ${selectColumns} FROM operator ${innerJoinQuery} WHERE operator.id=?`;
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Operador: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Operador: encontrado con éxito",
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

export const getOperators = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "operator",
        orderKey: "id",
        searchColumns: ["cod_operator", "first_name", "last_name", "cellphone"],
        selectColumns: `
          operator.id,
          operator.cod_operator,
          operator.first_name,
          operator.last_name,
          operator.cellphone,
          occupation.name as occupationName,
          turn.name as turnName,
          turn.start_time,
          turn.end_time,
          operator.created_at,
          operator.updated_at
        `,
        innerJoin: [
          {
            table: 'occupation',
            tableId: 'id',
            tableJoin: 'operator',
            tableJoinId: 'id_occupation'
          },
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
        message: "Operador: listado encontrado",
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
