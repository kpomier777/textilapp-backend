import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData } from "../helpers/list-handler.js";

const clientRegistered = async (cod_client) => {
  try {
    const query = "SELECT * FROM client WHERE cod_client = ?";
    const [rows] = await db.query(query, [cod_client]);

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

export const createClient = async (req, res) => {
  try {
    const { cod_client, first_name, last_name } = req.body;
    const enabled = true;
    const isRegistered = await clientRegistered(cod_client);
    if (isRegistered) {
      return res.send(
        responseTemplate({
          message: "Este Cliente ya esta registrado",
        })
      );
    }

    const query =
      "INSERT INTO client (cod_client, first_name, last_name, enabled) VALUES (?, ?, ?, ?)";
    const [rows] = await db.query(query, [
      cod_client,
      first_name,
      last_name,
      enabled,
    ]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Cliente: registrado con éxito",
        data: {
          clientId: lastInsertId,
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

export const updateClient = async (req, res) => {
  try {
    const { id, cod_client, first_name, last_name, enabled } = req.body;

    let sqlParams = [];
    let sqlParamsValue = [];

    if (checkValueNotUndefined(cod_client)) {
      sqlParams.push("cod_client = ?");
      sqlParamsValue.push(cod_client);
    }
    if (checkValueNotUndefined(first_name)) {
      sqlParams.push("first_name = ?");
      sqlParamsValue.push(first_name);
    }
    if (checkValueNotUndefined(last_name)) {
      sqlParams.push("last_name = ?");
      sqlParamsValue.push(last_name);
    }
    if (checkValueNotUndefined(enabled)) {
      sqlParams.push("enabled = ?");
      sqlParamsValue.push(enabled);
    }

    sqlParamsValue.push(id);

    const query = `UPDATE client SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE client.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Cliente: actualizado con éxito",
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

export const getClient = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM client WHERE id=?";
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Cliente: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Cliente: encontrado con éxito",
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

export const getClients = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "client",
        orderKey: "id",
        searchColumns: ["cod_client", "first_name", "last_name"],
      },
      andWhere: [
        "enabled=true"
      ]
    });

    return res.send({
      ...responseTemplate({
        status: true,
        message: "Clientes: listado encontrado",
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

export const getClientsEnabled = async (_, res) => {
  try {
    const query = "SELECT * FROM client WHERE client.enabled=true";
    const [rows] = await db.query(query);
    if (rows.length === 0) {
      throw new Error("Clientes: 0 habilitados");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Clientes: lista habilitados",
        data: rows,
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

export const getClientsDisabled = async (_, res) => {
  try {
    const query = "SELECT * FROM client WHERE client.enabled=false";
    const [rows] = await db.query(query);
    if (rows.length === 0) {
      throw new Error("Clientes: 0 deshabilitados");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Clientes: lista deshabilitados",
        data: rows,
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
