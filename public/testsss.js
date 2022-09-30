function decryptResult(decryptResult) {
  console.log('decryptResult 입니다 !!! => ' + decryptResult);
  let cc = JSON.stringify(decryptResult);
  localStorage.setItem('key', cc);

  const first = document.querySelector('.firstNextPage');
  if (decryptResult) {
    first.click();
    console.log('클릭안돼?');
  }
}

// function test11() {
//   return mDecryptResult;
// }
