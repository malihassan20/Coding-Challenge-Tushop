/*

Problem Statement: A factory has a list of jobs to perform. Each job has a start time, end time,
and profit value. The manager has asked his employee John to pick jobs of his choice. John
wants to select jobs for him in such a way that would maximize his earnings.

Given a list of jobs, how many jobs and total earnings are left for other employees once John
picks jobs of his choice.
Note: John can perform only one job at a time.

Input format:

Each Job has 3 pieces of info – Start Time, End Time, and Profit

The first line contains the number of Jobs for the day. Say ‘n’. So there will be ’3n' lines
following as each job has 3 lines.

Each of the next ‘3n’ lines contains jobs in the following format:
start_time
end-time
Profit
start-time and end-time are in HHMM 24HRS format i.e. 9am is 0900 and 9PM is 2100

Constraints:
The number of jobs in the day is less than 100 i.e. 0<_n<_10
The start time is always less than the end, and Hours can go only up to 2359.

Output format:
The program should return an array of 2 integers where 1st one is the number of jobs left and
the earnings of other employees.

Sample Input: 1
Enter the number of Jobs
3
Enter job start time, end time, and earnings
0900
1030
100
1000
1200
500
1100
1200
300
Sample Output: 1
The number of tasks and earnings available for others
Task: 2
Earnings: 400

Sample Input: 2
Enter the number of Jobs
3
Enter job start time, end time, and earnings
0900
1000
250
0945
1200
550
1130
1500
150
Sample Output: 2
The number of tasks and earnings available for others
Task: 2
Earnings: 400

Sample Input:3
Enter the number of Jobs
3
Enter job start time, end time, and earnings
0900
1030
100
1000
1200
100
1100
1200
100
Sample Output: 3
The number of tasks and earnings available for others
Task: 1
Earnings: 100

*/

const readline = require('readline');

const findJobsWithMaxProfit = (jobs) => {
  jobs.sort((a, b) => parseInt(a.end) - parseInt(b.end));

  const n = jobs.length;
  const profits = Array(n).fill(0); // Array to store max profit up to each job
  const lastNonOverlapping = Array(n).fill(-1); // Array that stores last non-overlapping job index for each job, if exists.

  profits[0] = jobs[0].profit; // Base case

  // Find the last non-overlapping job for each job
  for (let i = 1; i < n; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (parseInt(jobs[j].end) <= parseInt(jobs[i].start)) {
        lastNonOverlapping[i] = j;
        break;
      }
    }
  }
  // Fill the profits array with maximum profit up to each job
  for (let i = 1; i < n; i++) {
    const includeCurrent =
      jobs[i].profit +
      (lastNonOverlapping[i] !== -1 ? profits[lastNonOverlapping[i]] : 0);
    const excludeCurrent = profits[i - 1];
    profits[i] = Math.max(includeCurrent, excludeCurrent);
  }

  // check to find the jobs that give the maximum profit
  const pickedJobs = [];
  let i = n - 1;

  while (i >= 0) {
    if (i === 0 || profits[i] !== profits[i - 1]) {
      pickedJobs.push(jobs[i]); // include the current job
      i = lastNonOverlapping[i]; // go to the last non-overlapping job
    } else {
      i--; //skip the current job
    }
  }

  return pickedJobs;
};

const main = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let jobs = [];
  let jobCount = 0;

  rl.question('Enter the number of jobs: ', (n) => {
    jobCount = parseInt(n.trim(), 10);
    console.log(`You will enter details for ${jobCount} jobs.`);

    const getJobDetails = (index) => {
      if (index < jobCount) {
        console.log(`Enter details for Job ${index + 1}:`);
        rl.question('Start Time (HHMM): ', (startTime) => {
          rl.question('End Time (HHMM): ', (endTime) => {
            rl.question('Profit: ', (profit) => {
              jobs.push({
                start: startTime.trim(),
                end: endTime.trim(),
                profit: parseInt(profit.trim(), 10),
              });
              getJobDetails(index + 1); // Get details for the next job
            });
          });
        });
      } else {
        const pickedJobs = findJobsWithMaxProfit(jobs);
        const pickedJobSet = new Set(pickedJobs);
        const remainingJobs = jobs.filter((job) => !pickedJobSet.has(job));
        const remainingEarnings = remainingJobs.reduce(
          (sum, job) => sum + job.profit,
          0
        );

        console.log('\nThe number of tasks and earnings available for others');
        console.log(`Task: ${remainingJobs.length}`);
        console.log(`Earnings: ${remainingEarnings}`);
        rl.close();
      }
    };

    getJobDetails(0);
  });
};

main();
