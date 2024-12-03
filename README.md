# 2024-advent-of-code

Day 01 :
- part 1 : simple reduce functions
- part 2 : simple reduce functions + table

Day 02 :
- part 1 : simple filter / reduce function based on rules
- part 2 : once assume every single report has an error, then there is only one case to handle.
    - splicing every item in the array and testing against the rules (i.e. always engage the damper)
    - O(n^2) solution
    - the trick is to treat every input like they have an error and then try removing every item within each report until you get a positive report

Day 03 :
- part 1 : split the input and procedurally do the searching and parsing the searched items
- part 2 : parse the input to exclude everything in the `don't()` ranges, add some delimiters
    - by splitting the entire input, the first set after splitting by `don't()` will awlays be considered. For subsequent sets, find the first `do()` and only consider everything on the right hand side
    - the trick is to do some pre-filtering so that the input is suitable to be reused for part-1
