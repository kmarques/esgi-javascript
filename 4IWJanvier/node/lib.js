const ucfirst = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

const foo = 4;

module.exports = {
  foo: foo,
  ucfirst: ucfirst,
};
