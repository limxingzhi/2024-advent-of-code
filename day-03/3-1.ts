// const line = (await Deno.readTextFile("3-1.test.input.txt")).split("\n").join("");
const line = (await Deno.readTextFile("3-1.input.txt")).split("\n").join("");

const groupOne = line.split("mul(");

const ans = groupOne.reduce((acc, item) => {
  const [leftItem, ...rest] = item.split(",");

  const leftItemParsed = Number(leftItem);
  if (isNaN(leftItemParsed)) return acc;

  // we only care about the first item
  const [rightItem] = rest.join("").split(")");

  const rightItemParsed = Number(rightItem);
  if (isNaN(rightItemParsed)) return acc;

  return leftItemParsed * rightItemParsed + acc;
}, 0);

console.log(ans);
