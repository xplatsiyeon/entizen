let mDecryptResult;

function decryptResult(decryptResult) {
  console.log(decryptResult);
  let cc = JSON.stringify(decryptResult);
  localStorage.setItem('key', cc);
  mDecryptResult = decryptResult;
  if (decryptResult) {
    first.click();
    console.log('클릭안돼?');
  }
}

function test11() {
  return mDecryptResult;
}
