import 'colors'
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { addCounter, removeCounter, incrementCounter } from '../src/addCounter.js';

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
}

const testRemoveCounter = () => {
  const listBefore = [0, 10, 20];
  const listAfter = [0, 20];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 1)
  ).toEqual(listAfter);
}

const testIncrementCounter = () => {
  const listBefore = [0, 1, 2];
  const listAfter = [0, 1, 3];

  deepFreeze(listBefore)

  expect(incrementCounter(listBefore, 2)).toEqual(listAfter);
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All counter Test passed'.green.underline)
