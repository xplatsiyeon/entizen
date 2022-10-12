import {
  getCsrfToken,
  getProviders,
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';
import { useEffect } from 'react';

const Page = () => {
  const { data: session, status } = useSession();
  const csrfToken = getCsrfToken();
  const providers = getProviders();
  const loading = status === 'loading';

  useEffect(() => {
    console.log(session, status);
    csrfToken.then((res) => {
      console.log(res);
    });
    providers.then((res) => {
      console.log(res);
    });
  }, [session, status]);

  return (
    <div>
      <div>
        {!session && (
          <ul>
            <li>
              <a
                href={'/api/auth/signin'}
                onClick={(e) => {
                  e.preventDefault();
                  signIn('kakao');
                }}
              >
                Kakao Sign in
              </a>
            </li>
          </ul>
        )}
        {session && (
          <ul>
            <li>
              <a
                href={'/api/auth/signin'}
                onClick={(e) => {
                  e.preventDefault();
                  signOut();
                }}
              >
                Kakao logout
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
