export default function generateAnswers(n) {
  return new Array(n).fill().map((item, i) => {
    const obj = {
      id: i,
      value: null,
    };

    return obj;
  });
}
