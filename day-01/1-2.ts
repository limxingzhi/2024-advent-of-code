const lines = (await Deno.readTextFile("1-1.input.txt")).split("\n");
// const lines = (await Deno.readTextFile("1-1.test-input.txt")).split("\n");

// just create a set and then do math
//   key:   number-in-right,
//   value: count

const leftList: Array<string> = [];
const rightList: Array<string> = [];

lines.map((line) => {
  if (!line) return;

  const vals = line.split(" ");
  leftList.push(vals.at(0) ?? "");
  rightList.push(vals.at(-1) ?? "");
});

const rightTable = new Map<string, number>();

rightList.map((rightItem) => {
  const count = rightTable.get(rightItem) ?? 0;
  rightTable.set(rightItem, count + 1);
});

const result = leftList.reduce((acc, leftItem) => {
  return acc + parseInt(leftItem, 10) * (rightTable.get(leftItem) ?? 0);
}, 0);

console.log(result);
