const dayToExecute = new Date().getDate();

import(`./day-3`).then(
  (imports) => {
    Object.values(imports)
      .map((fn) => fn as () => unknown)
      .forEach((fn, index) => {
        console.log(`Day ${dayToExecute}, Challenge ${index + 1}:`, fn());
      });
  },
  (reason) => {
    console.log(
      `There is nothing to execute for Day ${dayToExecute}. Reason: `,
      reason
    );
  }
);
