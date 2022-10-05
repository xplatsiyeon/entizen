function decryptResult(decryptResult) {
  console.log('decryptResult 입니다 !!! => ' + decryptResult);
  let cc = JSON.stringify(decryptResult);
  localStorage.setItem('key', cc);

  const first = document.querySelector('.firstNextPage');
  if (decryptResult) {
    if (first) {
      first.click();
    }
  }
  const second = document.querySelector('.secondNextPage');
  if (decryptResult) {
    if (second) {
      second.click();
    }
  }
}

// function test11() {
//   return mDecryptResult;
// }
