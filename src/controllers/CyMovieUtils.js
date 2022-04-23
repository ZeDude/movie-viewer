export const getNumberOfPages = (dataArray, recordsPerPage) => {
  return dataArray === null
    ? 0
    : Math.floor((dataArray.length - 1) / recordsPerPage) + 1;
};

const createOptionFromValue = (val) => {
  return { key: val, text: val, value: val };
};

export const createOptionsFromArray = (array) => {
  const options = [];
  array.forEach((val) => {
    options.push(createOptionFromValue(val));
  });
  return options;
};

export const createRangeOptionsArray = (min, max) => {
  var array = [];
  for (let i = min; i <= max; i++) {
    array.push(i);
  }
  return createOptionsFromArray(array);
};

export const EMPTY_FILTER = {
  status: 'empty',
  titleInput: '',
  yearInput: '',
  minimumImdbInput: '',
  starsArrayInput: [],
  genresArrayInput: []
};
