import { useDispatch } from 'react-redux';
import { userAction } from 'store/quotationSlice';

function decryptResult(decryptResult) {
  const dispatch = useDispatch();

  console.log(decryptResult);
  const first = document.querySelector('.firstNextPage');
  const nameInput = document.querySelector('.nameInput');
  const phoneInput = document.querySelector('.phoneInput');
  console.log(first);
  if (nameInput) {
    nameInput.value = decryptResult.name;
    console.log(nameInput.value);
    dispatch(userAction.getname(nameInput.value));
  }
  if (phoneInput) {
    phoneInput.value = decryptResult.phone;
    console.log(phoneInput.value);
    dispatch(userAction.getphon(phoneInput.value));
  }
  if (decryptResult) {
    first.click();
    console.log('클릭안돼?');
  }
}
