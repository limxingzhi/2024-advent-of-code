const lines = (await Deno.readTextFile("1-1.input.txt")).split("\n");
// const lines = (await Deno.readTextFile("1-1.test-input.txt")).split("\n");

const leftList: Array<string> = [];
const rightList: Array<string> = [];

lines.map((line) => {
  const vals = line.split(" ");
  leftList.push(vals.at(0) ?? '');
  rightList.push(vals.at(-1) ?? '');
});

// @ts-ignore : *shrug*
leftList.sort((a, b) => a - b);
// @ts-ignore : *shrug*
rightList.sort((a, b) => a - b);

const result = leftList.reduce((acc, leftItem, index) => {
  return acc + Math.abs(Number(leftItem) - Number(rightList[index]));
}, 0);

console.log(result);
