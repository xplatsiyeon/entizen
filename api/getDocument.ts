import { fileDownload } from 'bridge/appToWeb';

export const getDocument = (documentId: string) => {
  // console.log('documentId=>', documentId);
  const fetch = require('node-fetch');

  const url = `https://api.modusign.co.kr/documents/${documentId}/embedded-view`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // authorization: `Basic ${process.env.NEXT_PUBLIC_MODUSIGN_KEY}==`,
      authorization:
        'Basic ZW50aXplbkBlbnRpemVuLmtyOk5XWXpPRGc0WldNdE1Ua3haQzAwWkRnMkxUaGpPR010T1dOaVpEWTROR0l6TlRZMA==',
    },
  };

  return fetch(url, options).then((res: Response) => res.json());
};

export function downloadModusignPdf(url: string) {
  // const url =
  //   'https://api.modusign.co.kr/documents/319c4100-79ec-11ed-96b5-c59df0be5207/file?signedUrlToken=documents%2F56c0ad20-2507-11ed-8a8e-fb9da558cacc%2F3160bea1-79ec-11ed-bd2a-6bbe23a257ff.pdf%3FX-Amz-Algorithm%3DAWS4-HMAC-SHA256%26X-Amz-Credential%3DAKIA3EQMQCJYW3XJ6IGM%252F20221225%252Fap-northeast-2%252Fs3%252Faws4_request%26X-Amz-Date%3D20221225T075845Z%26X-Amz-Expires%3D600%26X-Amz-Signature%3D8cbb6632a64a322bf213bed8c9e428ce5b245177f4df2485b13d74de1cd39e49%26X-Amz-SignedHeaders%3Dhost';
  fetch(url).then((t) => {
    return t.blob().then((b) => {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.setAttribute('download', '모두싸인 계약서');
      a.click();
    });
  });
}

export const modusignPdfDown = (documentId: string) => {
  const fetch = require('node-fetch');
  const url = `https://api.modusign.co.kr/documents/${documentId}`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: `Basic ${process.env.NEXT_PUBLIC_MODUSIGN_KEY}==`,
    },
  };

  return fetch(url, options).then((res: Response) => res.json());
};

export interface modusignPdfResponse {
  id: string;
  title: string;
  status: string;
  requester: {
    email: string;
    name: string;
  };
  participants: {
    id: string;
    name: string;
    signingOrder: number;
    signingDue: {
      valid: boolean;
      datetime: string;
    };
    signingMethod: {
      type: string;
      value: string;
    };
    locale: string;
  }[];

  currentSigningOrder: number;
  signings: [
    {
      participantId: string;
      signedAt: string;
    },
    {
      participantId: string;
      signedAt: string;
    },
    {
      participantId: string;
      signedAt: string;
    },
  ];
  accessibleByParticipant: boolean;
  abort: string;
  metadatas: [];
  updatedAt: string;
  createdAt: string;
  file: {
    downloadUrl: string;
  };
  auditTrail: {
    downloadUrl: string;
  };
}
