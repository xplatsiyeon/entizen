function decryptResult(decryptResult) {
  console.log(decryptResult);
  const first = document.querySelector('.firstNextPage');
  console.log(first);
  if (decryptResult) {
    first.click();
    console.log('클릭안돼?');
  }
}
