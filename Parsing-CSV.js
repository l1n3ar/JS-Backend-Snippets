const fs = require('fs');
// const csv = require('csv-parser');
const { parse } = require('csv-parse');
const results = [];

fs.createReadStream('./kepler_data.csv')
  .on('error', () => {
    console.log(error);
  })
  .pipe(
    parse({
      comment: '#',
      columns: true,
    })
  )
  .on('data', (data) => {
    results.push(data);
  })
  .on('end', () => {
    console.log('Gathered Data');
    console.log(results);
  });

