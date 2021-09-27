export const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

export const numberWithCommas = (x) => {
  if (isNaN(x)) {
    return x;
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
