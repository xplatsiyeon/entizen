import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';

type Props = {};

export default function cookieTest(props: Props) {
  const [cookies, setCookie] = useCookies(['CSRF-TOKEN']);

  const cookieValue = cookies['CSRF-TOKEN'];
  console.log('CSRF-TOKEN 값:', cookieValue);

  return <div>cookieTest</div>;
}
