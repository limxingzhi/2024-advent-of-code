// const line = (await Deno.readTextFile("3-2.test.input.txt")).split("\n").join("");
const line = (await Deno.readTextFile("3-1.input.txt")).split("\n").join("");

const groupOne = line
  .split("don't()")
  .map((item, index) => {
    if (index === 0) return item; // always do in the first set

    // ignore the LHS of "do()" within the set of a "don't()"
    const [_, ...rest] = item.split("do()");
    return rest.join("=");
  })
  .join("=")
  .split("mul(");

// same as part 1
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
