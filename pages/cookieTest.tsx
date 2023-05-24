import React from 'react';
import { useCookies } from 'react-cookie';

type Props = {};

const cookieTest = (props: Props) => {
  const [cookies, setCookie] = useCookies(['CSRF-TOKEN']);
  // setCookie('cookieName', '새로운 값', { path: '/' });

  console.log(cookies['CSRF-TOKEN']);
  return <div>cookieTest</div>;
};
