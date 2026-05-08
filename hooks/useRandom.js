export function getRandomIndex(currentIndex, total) {
  if (total <= 1) return 0;
  var index;
  do {
    index = Math.floor(Math.random() * total);
  } while (index === currentIndex);
  return index;
}
