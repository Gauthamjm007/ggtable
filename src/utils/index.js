import queryString from "query-string";

export const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

export const numberWithCommas = (x) => {
  if (isNaN(x)) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const queryFilter = (searchString, newQuery) => {
  let _query = queryString.parse(searchString);
  _query = { ..._query, ...newQuery };
  _query = Object.entries(_query).reduce(
    (a, [k, v]) => (v ? ((a[k] = v), a) : a),
    {}
  );
  if (Object?.keys(_query)?.length) {
    return queryString.stringify(_query, { arrayFormat: "comma" });
  } else {
    return "";
  }
};

export const updateArrayOfObj = (arr, obj, field, compare_value) => {
  if (
    arr?.length !== 0 &&
    Object.keys(obj)?.length !== 0 &&
    field &&
    compare_value
  ) {
    return arr.map((item) => {
      if (item[field] === compare_value) {
        return { ...item, ...obj };
      } else {
        return { ...item };
      }
    });
  } else {
    console.error("required fields are missing for updateArrayOfObj");
    return [];
  }
};
