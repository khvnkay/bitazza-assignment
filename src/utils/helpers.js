
function createData(total, size, price) {
  return {
    total,
    size,
    price,
  };
}

export const groupByType = (list, type) => {
  let data = [];

  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element[9] === type && element[8] > 0) {
      data.push(createData(element[4], element[8], element[8] * element[4]));
    }
  }
  return data;
};

export const formatNumber = (arg) => {
  return new Intl.NumberFormat('en-US').format(arg);
};
