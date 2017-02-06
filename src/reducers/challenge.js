import generateAnswers from '../utility/generateAnswers';

const answers = generateAnswers(5);

const defaultState = {
  answers,
  stage: 0,
  lastAnswer: null,
};

export default function challenge(state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
