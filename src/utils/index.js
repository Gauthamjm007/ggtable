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

const currentTime = () => {
  return Date.now();
};

export const getCachedData = (url) => {
  let time = 1000 * 60 * 60 * 24 * 20;
  let dataCache = {
    data: {},
    nextCleanup: new Date().getTime() + time,
  };

  try {
    const data = localStorage.getItem(url);

    if (data) {
      dataCache = JSON.parse(data);
    }
  } catch (e) {
    console.error(e.message);
  }

  return dataCache;
};

const cleanUpStorage = (data, url, time) => {
  let isDeleted;
  let oldest;
  let oldestKey;

  for (const key in data) {
    const expiry = data[key].expiry;
    if (expiry && expiry <= currentTime()) {
      delete data[key];
      isDeleted = true;
    }

    if (!oldest || oldest > expiry) {
      oldest = expiry;
      oldestKey = key;
    }
  }

  if (!isDeleted && oldestKey) {
    delete data[oldestKey];
  }

  localStorage.setItem(
    url,
    JSON.stringify({
      data: data,
      nextCleanup: currentTime() + time,
    })
  );
};

export const setUrlToCache = (url, value, day) => {
  let time = 1000 * 60 * 60 * 24 * day;
  const dataCache = getCachedData(url, time);

  const data = dataCache.data;

  const item = {
    id: url,
    expiry: new Date().getTime() + time,
    data: value,
  };

  data[url] = item;

  try {
    localStorage.setItem(url, JSON.stringify(dataCache));
  } catch (e) {
    cleanUpStorage(data, url, time);
  }
};
