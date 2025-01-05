/*

Let's say the HR team of a company has goodies set of size N each with a different price tag for
each goodie. Now the HR team has to distribute the goodies among the M employees in the
company such that one employee receives one goodie. Find out the goodies the HR team can
distribute so that the difference between the low price goodie and the high price goodie selected
is minimum.

Input:
Goodies and Prices:
Fitbit Plus: 7980
IPods: 22349
MI Band: 999
Cult Pass: 2799
Macbook Pro: 229900
Digital Camera: 11101
Alexa: 9999
Sandwich Toaster: 2195
Microwave Oven: 9800
Scale: 4999
Example Output
Number of the employees: 4
Here the goodies that are selected for distribution are:
Fitbit Plus: 7980
Microwave Oven: 9800
Alexa: 9999
Digital Camera: 11101
And the difference between the chosen goodie with highest price and the lowest price is 3121
Number of employees: 6
Here the goodies that are selected for distribution are:
Sandwich Toaster: 2195
Cult Pass: 2799
Scale: 4999
Fitbit Plus: 7980
Microwave Oven: 9800
Alexa: 9999
And the difference between the chosen goodie with highest price and the lowest price is 7804
Number of employees: 2
Here the goodies that are selected for distribution are:
Microwave Oven: 9800
Alexa: 9999

And the difference between the chosen goodie with highest price and the lowest price is 199
The input has to be read from a file. The input file contains all the goodies and their prices as
shown in the example input file sample_input.txt.
The output has to be written to a file as shown in the example output file sample_output.txt.

*/

const fs = require('fs');

function distributeGoodies(inputFile, outputFile) {
  // Reading file
  const data = fs.readFileSync(inputFile, 'utf8').split('\n');

  // Get the number of employees
  const numOfEmployees = parseInt(data[0].split(':')[1].trim());
  // Get the goodies and their prices from data
  const goodiesPrices = [];
  for (let i = 2; i < data.length; i++) {
    if (data[i].trim()) {
      const [goodie, price] = data[i].split(':').map((item) => item.trim());
      goodiesPrices.push({ goodie, price: parseInt(price) });
    }
  }
  // Sort the goodies by price
  goodiesPrices.sort((a, b) => a.price - b.price);

  let minDiff = 99999999; //large number used so we get to keep the goodies group on first iteration
  let selectedGoodies = [];
  for (let i = 0; i <= goodiesPrices.length - numOfEmployees; i++) {
    //creating goodies group of size equal to number of employees
    const goodiesGroup = goodiesPrices.slice(i, i + numOfEmployees);
    const minPrice = goodiesGroup[0].price;
    const maxPrice = goodiesGroup[goodiesGroup.length - 1].price;
    const diff = maxPrice - minPrice;
    //keeping the goodies group with minimum difference
    if (diff < minDiff) {
      minDiff = diff;
      selectedGoodies = goodiesGroup;
    }
  }

  // Writing the result to file
  let result = 'The goodies selected for distribution are:\n';
  selectedGoodies.forEach((goodie) => {
    result += `${goodie.goodie}: ${goodie.price}\n`;
  });
  result += `And the difference between the chosen goodie with highest price and the lowest price is ${minDiff}\n`;

  fs.writeFileSync(outputFile, result);
}

//replace the file names with your file names
distributeGoodies('input1.txt', 'output1.txt');
distributeGoodies('input2.txt', 'output2.txt');
distributeGoodies('input3.txt', 'output3.txt');
