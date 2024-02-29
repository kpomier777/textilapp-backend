import { db } from "../db.js";
import { responseTemplate } from "../helpers/response.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import { getListData, buildInnerJoin } from "../helpers/list-handler.js";

export const createProduct = async (req, res) => {
  try {
    const { lote, name, weight_less, weight_total, observation, id_area, id_color, id_title } = req.body;

    const query = "INSERT INTO product (lote, name, weight_less, weight_total, observation, id_area, id_color, id_title) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const [rows] = await db.query(query, [lote, name, weight_less, weight_total, observation, id_area, id_color, id_title]);
    const lastInsertId = rows.insertId;

    return res.send(
      responseTemplate({
        status: true,
        message: "Producto: registrado con éxito",
        data: {
          productId: lastInsertId,
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

export const updateProduct = async (req, res) => {
  try {
    const { id, lote, name, weight_less, weight_total, observation, id_area, id_color, id_client, id_title } = req.body;

    let sqlParams = [];
    let sqlParamsValue = [];

    if (checkValueNotUndefined(lote)) {
      sqlParams.push("lote = ?");
      sqlParamsValue.push(lote);
    }
    if (checkValueNotUndefined(name)) {
      sqlParams.push("name = ?");
      sqlParamsValue.push(name);
    }
    if (checkValueNotUndefined(weight_less)) {
      sqlParams.push("weight_less = ?");
      sqlParamsValue.push(weight_less);
    }
    if (checkValueNotUndefined(weight_total)) {
      sqlParams.push("weight_total = ?");
      sqlParamsValue.push(weight_total);
    }
    if (checkValueNotUndefined(observation)) {
      sqlParams.push("observation = ?");
      sqlParamsValue.push(observation);
    }
    if (checkValueNotUndefined(id_area)) {
      sqlParams.push("id_area = ?");
      sqlParamsValue.push(id_area);
    }
    if (checkValueNotUndefined(id_color)) {
      sqlParams.push("id_color = ?");
      sqlParamsValue.push(id_color);
    }
    if (checkValueNotUndefined(id_title)) {
      sqlParams.push("id_title = ?");
      sqlParamsValue.push(id_title);
    }

    sqlParamsValue.push(id);

    const query = `UPDATE product SET ${sqlParams.join(
      ","
    )}, updated_at = CURRENT_TIMESTAMP WHERE product.id = ?`;

    await db.query(query, sqlParamsValue);

    return res.send(
      responseTemplate({
        status: true,
        message: "Producto: actualizado con éxito",
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

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const innerJoinQuery = buildInnerJoin([
      {
        table: 'area',
        tableId: 'id',
        tableJoin: 'product',
        tableJoinId: 'id_area'
      },
      {
        table: 'color',
        tableId: 'id',
        tableJoin: 'product',
        tableJoinId: 'id_color'
      },
      {
        table: 'title',
        tableId: 'id',
        tableJoin: 'product',
        tableJoinId: 'id_title'
      },
    ])
    const selectColumns = `
      product.id,
      product.lote,
      product.name,
      product.weight_less,
      product.weight_total,
      product.observation,
      area.id as idArea,
      area.name as areaName,
      color.id as idColor,
      color.name as colorName,
      title.id as idTitle,
      title.name as titleName,
      product.created_at,
      product.updated_at
    `
    const query = `SELECT ${selectColumns} FROM product ${innerJoinQuery} WHERE product.id=?`;
    const [rows] = await db.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Producto: no encontrado");
    }
    return res.send(
      responseTemplate({
        status: true,
        message: "Producto: encontrado con éxito",
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

export const getProducts = async (req, res) => {
  try {
    const { search, page, limit, orderby, notlimit } = req.query;

    const resultList = await getListData({
      search,
      page,
      limit,
      orderby,
      notlimit,
      table: {
        name: "product",
        orderKey: "id",
        searchColumns: ["product.lote", "product.name", "product.weight_less", "product.weight_total", "product.observation"],
        selectColumns: `
          product.id,
          product.lote,
          product.name,
          product.weight_less,
          product.weight_total,
          product.observation,
          area.name as areaName,
          color.name as colorName,
          title.name as titleName,
          product.created_at,
          product.updated_at
        `,
        innerJoin: [
          {
            table: 'area',
            tableId: 'id',
            tableJoin: 'product',
            tableJoinId: 'id_area'
          },
          {
            table: 'color',
            tableId: 'id',
            tableJoin: 'product',
            tableJoinId: 'id_color'
          },
          {
            table: 'title',
            tableId: 'id',
            tableJoin: 'product',
            tableJoinId: 'id_title'
          },
        ]
      },
    });

    return res.send({
      ...responseTemplate({
        status: true,
        message: "Producto: listado encontrado",
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
