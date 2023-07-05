export function createRandomColorCode() {
  let colorCode = '#';
  for (let c = 0; c < 6; c++) {
    colorCode += Math.round(Math.random() * 0xf).toString(16);
  }
  return colorCode;
}