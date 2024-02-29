import { db } from "../db.js";
import { convertPageNumber, getPageNumber } from "../helpers/pagination.js";
import { checkValueNotUndefined } from "../helpers/request.js";
import {
  ORDERBY_DEFAULT,
  PAGINATION_LIMIT_DEFAULT,
  PAGINATION_PAGE_DEFAULT,
} from "../helpers/constants.js";

export function buildInnerJoin(innerJoin) {
  const innerJoinList = []
  innerJoin.forEach(tableInner => {
    innerJoinList.push(`INNER JOIN ${tableInner.table} ON ${tableInner.table}.${tableInner.tableId} = ${tableInner.tableJoin}.${tableInner.tableJoinId}`)
  })
  return innerJoinList.join(' ')
}
export function buildQuerySearch(columnsKey, search) {
  const columnsQuery = [];
  columnsKey.forEach((columnKey) => {
    columnsQuery.push(`${columnKey} LIKE '%${search}%'`);
  });
  if (columnsQuery.length !== 0) {
    if (columnsQuery.length >= 2) {
      const queryAditional = `CONCAT(${columnsKey.join(
        ", ' ', "
      )}) LIKE '%${search}%'`;
      return `WHERE ${columnsQuery.join(" OR ")} OR ${queryAditional}`;
    }
    return `WHERE ${columnsQuery.join(" OR ")}`;
  }
  return "";
}

export function buildQueryList(
  tableName,
  selectColumns,
  searchQuery,
  innerJoinQuery,
  andWhereQuery,
  orderbyQuery,
  paginationParams
) {
  return `SELECT ${selectColumns} FROM ${tableName} ${innerJoinQuery} ${searchQuery} ${andWhereQuery}
          ${orderbyQuery} LIMIT ${paginationParams.join(",")}
          `;
}

export async function getCountList(searchQuery, andWhereQuery, tableName) {
  const [rowsCount] = await db.query(
    `SELECT COUNT(*) as rowsCount FROM ${tableName} ${searchQuery} ${andWhereQuery}`
  );
  if (rowsCount.length === 0) {
    throw new Error("no se tienen registros");
  }
  return rowsCount[0].rowsCount;
}

export async function getDataList(query) {
  const [rows] = await db.query(query);
  if (rows.length === 0) {
    throw new Error("no existen datos");
  }
  return rows;
}

export async function getListData({
  search,
  page,
  limit,
  orderby,
  notlimit,
  table: {
    name: tableName,
    orderKey: tableOrderKey,
    searchColumns,
    innerJoin,
    selectColumns = '*'
  },
  andWhere
}) {
  /* Variables */
  let searchQuery = "";
  let orderbyQuery = "";
  let andWhereQuery = "";
  let innerJoinQuery = "";

  let paginationParams = [];
  let currentPage = PAGINATION_PAGE_DEFAULT;
  let currentLimit = PAGINATION_LIMIT_DEFAULT;

  /* Validate search */
  if (checkValueNotUndefined(search)) {
    searchQuery = buildQuerySearch(searchColumns, search);
  }
  /* Validate andWhere */
  if (checkValueNotUndefined(andWhere)) {
    if (searchQuery !== "") {
      andWhereQuery = `AND ${andWhere.join(' AND ')}`;
    } else {
      andWhereQuery = `WHERE ${andWhere.join(' AND ')}`;
    }
  }
  /* Validate innerJoin */
  if (checkValueNotUndefined(innerJoin)) {
    innerJoinQuery = buildInnerJoin(innerJoin)
  }
  /* Get the total elements of the list */
  const rowsCount = await getCountList(searchQuery, andWhereQuery, tableName);

  /* Validate limit */
  if (checkValueNotUndefined(limit)) {
    currentLimit = limit > 0 ? limit : PAGINATION_LIMIT_DEFAULT;
  }
  /* Validate notlimit */
  if (checkValueNotUndefined(notlimit)) {
    currentLimit = notlimit
      ? rowsCount
      : currentLimit; /* if notlimit is true set the rowsCount */
  }
  /* Validate page */
  if (checkValueNotUndefined(page)) {
    currentPage = page > 0 ? convertPageNumber(page) : PAGINATION_PAGE_DEFAULT;
  }

  if (checkValueNotUndefined(orderby)) {
    const ORDERBY_CUSTOM = String(orderby).toUpperCase();
    if (ORDERBY_CUSTOM === "ASC" || ORDERBY_CUSTOM === "DESC") {
      orderbyQuery = `ORDER BY ${tableOrderKey} ${ORDERBY_CUSTOM}`;
    } else {
      orderbyQuery = `ORDER BY ${tableOrderKey} ${ORDERBY_DEFAULT}`;
    }
  } else {
    orderbyQuery = `ORDER BY ${tableOrderKey} ${ORDERBY_DEFAULT}`;
  }

  paginationParams.push(currentPage * currentLimit);
  paginationParams.push(currentLimit);

  const listQuery = buildQueryList(
    tableName,
    selectColumns,
    searchQuery,
    innerJoinQuery,
    andWhereQuery,
    orderbyQuery,
    paginationParams
  );

  const listData = await getDataList(listQuery);

  const lastPage = Math.ceil(rowsCount / currentLimit);
  const nextPage = currentPage + 1 < lastPage ? currentPage + 1 : null;
  const backPage = currentPage > 0 ? currentPage - 1 : null;

  return {
    rows: listData,
    pagination: {
      page: {
        index: getPageNumber(currentPage),
        limit: currentLimit,
      },
      result: {
        count: rowsCount,
      },
      navigation: {
        next: getPageNumber(nextPage),
        back: getPageNumber(backPage),
        last: lastPage,
        first: 1,
      },
    },
  };
}
