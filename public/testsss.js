function decryptResult(decryptResult) {
  // console.log('decryptResult 입니다 !!! => ' + decryptResult);
  let jsonDecryptResult = JSON.stringify(decryptResult);
  localStorage.setItem('key', jsonDecryptResult);

  const first = document.querySelector('.firstNextPage');
  if (decryptResult) {
    // const key = localStorage.getItem('key');
    if (first) {
      first.click();
    }
  }
}
