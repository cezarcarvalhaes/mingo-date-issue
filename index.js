const runMingo = require("./runMingo");

const script = [
    {
    $addFields: {
      parsedDate: {
        $dateFromString: {
          dateString: "$date",
          format: "%m/%d/%Y",
        },
      }
    },
  },
  {
    $addFields: {
      newDate: {
          $dateFromParts: {
          year: {
            $year: "$parsedDate",
          },
          month: {
            $month: "$parsedDate",
          },
          day: {
            $subtract: [
              {
                $dayOfMonth: "$parsedDate",
              },
              1,
            ],
          },
        },
      },
    },
  },
  {
    $project: {
      value: {
              $dateToString: {
                date: '$newDate',
                format: '%m/%d/%Y',
              },
            },
    },
  },
];

const checkDates = (date) => {
  const { value, error } = runMingo(script, { date });
  if (error) {
    console.error(error);
    return;
  }
  console.log(`input: ${date} | output: ${value}`);
};

const datesToCheck = [
 '02/01/2022',
 '01/31/2022',
 '03/01/2022',
 '03/17/2022',
];

datesToCheck.forEach((date) => {
  checkDates(date)
});