import { fileDownload } from 'bridge/appToWeb';

export const getDocument = (documentId: string) => {
  // console.log('documentId=>', documentId);
  const fetch = require('node-fetch');

  const url = `https://api.modusign.co.kr/documents/${documentId}/embedded-view`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization:
        // 'Basic ZW50aXplbkBlbnRpemVuLmtyOk5XWXpPRGc0WldNdE1Ua3haQzAwWkRnMkxUaGpPR010T1dOaVpEWTROR0l6TlRZMA==',
        `Basic ${process.env.NEXT_PUBLIC_MODUSIGN_KEY}`,
    },
  };

  return fetch(url, options).then((res: Response) => res.json());
};

export function downloadModusignPdf(url: string) {
  fetch(url).then((t) => {
    return t.blob().then((b) => {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(b);
      a.setAttribute('download', '모두싸인 계약서');
      // 다운로드 브릿지
      // 다운로드 브릿지가 추가 되어야 하나?
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
      authorization: `Basic ${process.env.NEXT_PUBLIC_MODUSIGN_KEY}`,
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
