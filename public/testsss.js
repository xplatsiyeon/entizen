let mDecryptResult;

function decryptResult(decryptResult) {
  console.log(decryptResult);

  mDecryptResult = decryptResult;

  const first = document.querySelector('.firstNextPage');
  const nameInput = document.querySelector('.nameInput');
  const phoneInput = document.querySelector('.phoneInput');
  console.log(first);
  if (nameInput) {
    nameInput.value = decryptResult.name;
    console.log(nameInput.value);
  }
  if (phoneInput) {
    phoneInput.value = decryptResult.phone;
    console.log(phoneInput.value);
  }
  if (decryptResult) {
    first.click();
    console.log('클릭안돼?');
  }
}

export function test11() {
  return mDecryptResult;
}
