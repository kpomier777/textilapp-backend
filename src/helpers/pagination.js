export function getPageNumber(numberPage) {
  if (numberPage !== null) {
    return numberPage + 1;
  }
  return numberPage;
}

export function convertPageNumber(numberPage) {
  return numberPage - 1;
}
