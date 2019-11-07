export const numberPages = (perPage, array) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(array.length / perPage); i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
};
