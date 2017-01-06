import { expect } from 'chai';

import { myCombineReducers } from '../src/reducers';

const initialState = {
  D: true,
};

const sampleReducerOne = (state, action) => {
  switch (action.type) {
    case 'A':
      return { A: true };
    case 'C':
      return { C: true };
    default:
      return state;
  }
};

const sampleReducerTwo = (state, action) => {
  switch (action.type) {
    case 'B':
      return { B: true };
    case 'C':
      return { C: true };
    default:
      return state;
  }
};

const sampleReducers = myCombineReducers(sampleReducerOne, sampleReducerTwo);

describe('MyCombineReducers', () => {
  it('should make sure that reducers update the state correctly', () => {
    const aState = myCombineReducers(sampleReducerOne)(initialState, { type: 'A' });
    const bState = myCombineReducers(sampleReducerTwo)(initialState, { type: 'B' });

    expect(aState.A).to.be.true;
    expect(aState.B).to.be.undefined;
    expect(aState.C).to.be.undefined;
    expect(aState.D).to.be.true;

    expect(bState.A).to.be.undefined;
    expect(bState.B).to.be.true;
    expect(bState.C).to.be.undefined;
    expect(bState.D).to.be.true;
  });

  it('should produce a reducer that responds to actions from all input reducers', () => {
    const abState = sampleReducers(sampleReducers(initialState, { type: 'A' }), { type: 'B' });

    expect(abState.A).to.be.true;
    expect(abState.B).to.be.true;
    expect(abState.C).to.be.undefined;
    expect(abState.D).to.be.true;
  });

  it('should be upset if multiple reducers match the same action', () => {
    expect(sampleReducers.bind(null, initialState, { type: 'C' })).to.throw('Multiple reducers matched the action');
  });
});
