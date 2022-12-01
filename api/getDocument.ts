export const getDocument = (documentId: string) => {
  const fetch = require('node-fetch');

  const url = `https://api.modusign.co.kr/documents/${documentId}/embedded-view`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization:
        'Basic ZW50aXplbkBlbnRpemVuLmtyOk5XWXpPRGc0WldNdE1Ua3haQzAwWkRnMkxUaGpPR010T1dOaVpEWTROR0l6TlRZMA==',
    },
  };

  return fetch(url, options).then((res: Response) => res.json());
};
