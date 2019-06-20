const adjs = ["Jan", "Feb", "March", "april" , "june", "july", "august", "sept", "oct", "nov","Dec"];

const nouns = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

module.exports = () => {
  const adj = adjs[Math.floor(Math.random() * adjs.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const MIN = 1000;
  const MAX = 9999;
  const num = Math.floor(Math.random() * ((MAX + 1) - MIN)) + MIN;

  return `${adj}-${noun}-${num}`;
};
