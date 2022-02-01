const runMingo = require("./runMingo");

const data = [
  {
    "date": "02/01/2022"
  },
  
];

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
      yearFromDate: {
          $dateFromParts: {
          year: {
                $year: "$parsedDate",
          },
          month: {
            $month: "$parsedDate",
            
          },
          day: {
            // $subtract: [
            //   {
                $dayOfMonth: "$parsedDate",
                
            //   },
            //   1,
              
            // ],
            
          },
          
        },
      },
    },
  },
  {
    $project: {
      value: "$yearFromDate",
    },
  },
];

console.log(runMingo(script, data))
