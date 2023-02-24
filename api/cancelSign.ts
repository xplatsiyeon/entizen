const fetch = require('node-fetch');

export const modusignCancel = (documentId: string) => {
  const url = `https://api.modusign.co.kr/documents/${documentId}/cancel`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization:
        'Basic ZW50aXplbkBlbnRpemVuLmtyOk5XWXpPRGc0WldNdE1Ua3haQzAwWkRnMkxUaGpPR010T1dOaVpEWTROR0l6TlRZMA==',
      // `Basic ${process.env.NEXT_PUBLIC_MODUSIGN_KEY}==`,
    },
    body: JSON.stringify({
      accessibleByParticipant: false,
      message: '취소후 다시 요청하겠습니다.',
    }),
  };

  return fetch(url, options).then((res: Response) => res.json());
};
