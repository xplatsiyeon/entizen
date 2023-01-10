export function decryptResult(decryptResult: any) {
  console.log('decryptResult 입니다 !!! => ' + decryptResult);
  let jsonDecryptResult = JSON.stringify(decryptResult);
  sessionStorage.setItem('key', jsonDecryptResult);

  const first: HTMLButtonElement = document.querySelector('.firstNextPage')!;
  if (decryptResult) {
    // const key = sessionStorage.getItem('key');
    if (first) {
      first.click();
    }
  }
}
