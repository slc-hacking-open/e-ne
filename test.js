const obj = {
  num: 1,
  arr: [1, 2, 3]
};

const concat = {
  ...obj,
  arr: [4, 5, 6, ...obj.arr]
};

console.log(obj);
console.log(concat);
