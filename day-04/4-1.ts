// const lines = (await Deno.readTextFile("4-1.input.txt"))
const lines = (await Deno.readTextFile("4-1.test.input.txt"))
  .split("\n")
  .slice(0, -1)
  .map((item) => item.split(""));

const searchStr = ["X", "M", "A", "S"];

interface Position {
  x: number;
  y: number;
}

interface SearchNode extends Position {
  val: string;
}

// get all of the surrounding items
function getCandidates(x: number, y: number): Array<SearchNode> {
  return [
    { val: lines?.[x - 1]?.[y], x: x - 1, y: y },
    { val: lines?.[x]?.[y - 1], x: x, y: y - 1 },
    { val: lines?.[x + 1]?.[y], x: x + 1, y: y },
    { val: lines?.[x]?.[y + 1], x: x, y: y + 1 },

    { val: lines?.[x - 1]?.[y - 1], x: x - 1, y: y - 1 },
    { val: lines?.[x + 1]?.[y - 1], x: x + 1, y: y - 1 },
    { val: lines?.[x - 1]?.[y + 1], x: x - 1, y: y + 1 },
    { val: lines?.[x + 1]?.[y + 1], x: x + 1, y: y + 1 },
  ].filter(({ val }) => Boolean(val)) as Array<SearchNode>;
}

// add every single char into search queue
const searchStack: Array<Array<SearchNode>> = [];
lines.map((line, x) =>
  line.map((val, y) => {
    if (val === searchStr[0]) searchStack.push([{ x, y, val }]);
  }),
);

const searchedSet = new Set<string>();

// PROBLEM : im not keeping track of the positions of each char
// - Use that to determine how many unique strings there are

let count = 0;

function serializedNodes(node: Array<SearchNode>): string {
  return node
    .map((candidate) => `${candidate.x}:${candidate.y}:${candidate.val}`)
    .join("=");
}

while (searchStack.length > 0) {
  const candidate = searchStack.pop() as Array<SearchNode>;
  const searchChar = searchStr[candidate.length];

  searchedSet.add(serializedNodes(candidate));

  const lastNode = candidate.at(-1) as SearchNode;

  // filter the neighbors to see if they have the char we want
  const newCandidates = getCandidates(lastNode.x, lastNode.y).filter(
    (item) => item.val === searchChar,
  );
  // .filter((item) => !searchedSet.has(serializedNodes(item)));

  searchStack.push(
    ...newCandidates.map((newCandy) => [...candidate, newCandy]),
  );

  if (candidate.length === 3) count += newCandidates.length;
}

console.log(
  // count,
  Array.from(searchedSet)
    .filter((item) => item.includes("S"))
    .sort(),
);
