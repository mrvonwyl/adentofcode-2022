import * as day1 from './1';

Object.values(day1).forEach((f, index) => {
  const result = f();
  console.log(`Day 1, Challenge ${index + 1}:`, result);
});
