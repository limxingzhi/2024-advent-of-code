// const lines = (await Deno.readTextFile("2-1.test-input.txt"))
const lines = (await Deno.readTextFile("2-1.input.txt"))
  .split("\n")
  .slice(0, -1);

const cleaned = lines.map((item) =>
  item.split(" ").map((item) => parseInt(item, 10)),
);

const ans = cleaned.reduce((count, line) => {
  // positive for rising, negative for going down
  const direction = line[0] - line[1] > 0 ? -1 : 1;

  for (let i = 1; i < line.length; i++) {
    const prev = line[i - 1];
    const current = line[i];

    const difference = (current - prev) * direction;
    if (difference > 3 || difference <= 0 || current === prev) return count;
  }

  return count + 1;
}, 0);

console.log(ans);
