// const lines = (await Deno.readTextFile("2-1.test-input.txt"))
const lines = (await Deno.readTextFile("2-1.input.txt"))
  .split("\n")
  .slice(0, -1);

const cleaned = lines.map((item) =>
  item.split(" ").map((item) => parseInt(item, 10)),
);

// remove every item in the array once until we find one that has no errors
const ans = cleaned.reduce((count, line) => {
  for (let x = 0; x < line.length; x++) {
    const lineClone = [...line];
    lineClone.splice(x, 1); // remove one item
    const direction = lineClone[0] - lineClone[1] > 0 ? -1 : 1;

    // error flag to maintain state outside of the inner loop
    let hasError = false;

    for (let i = 1; i < lineClone.length; i++) {
      const prev = lineClone[i - 1];
      const current = lineClone[i];

      const difference = (current - prev) * direction;
      if (difference > 3 || difference <= 0 || current === prev) {
        // break inner loop if there is error
        i = Infinity;
        hasError = true;
      }
    }

    // break out of outer loop due to success
    if (!hasError) return count + 1;
  }

  return count;
}, 0);

console.log(ans);
