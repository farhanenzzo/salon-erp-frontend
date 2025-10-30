export const formatString = (string) => {
  return string
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
};
