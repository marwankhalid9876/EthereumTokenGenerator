let info = {};

const setData = (data) => {
  info = data;
};
const getData = () => {
  return info;
};

module.exports = { getData, setData };
