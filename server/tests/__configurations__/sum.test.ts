import dotenv from 'dotenv'; // Import dotenv to manage environment variables 
dotenv.config(); // Load environment variables from .env file

console.log('NODE_ENV:', process.env.NODE_ENV); // Log the current NODE_ENV to verify it's set correctly
const sum = (a: number, b: number): number => { // A simple function to add two numbers
  return a + b;
}

test('adds 1 + 2 to equal 3', () => { // The test function defines a test case
  expect(sum(1, 2)).toBe(3); // The expect statement uses a matcher (.toBe()) to check the result
});
