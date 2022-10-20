export const numberCommaChange = (value: string) => {
  return value.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
