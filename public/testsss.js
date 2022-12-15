function decryptResult(decryptResult) {
  console.log('decryptResult 입니다 !!! => ' + decryptResult);
  let cc = JSON.stringify(decryptResult);
  sessionStorage.setItem('key', cc);

  const first = document.querySelector('.firstNextPage');
  if (decryptResult) {
    const key = sessionStorage.getItem('key');
    if (first && key) {
      console.log('key',key)
      first.click();
    }else{
      console.log('yet');
    }

  }
  // const second = document.querySelector('.secondNextPage');
  // if (decryptResult) {
  //   if (second) {
  //     second.click();
  //   }
  // }
}
