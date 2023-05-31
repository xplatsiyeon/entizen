// 모두싸인 삭제 api
export const deleteSign = (documentId: string) => {
  const url = `https://api.modusign.co.kr/documents/${documentId}/cancel`;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Basic ${process.env.NEXT_PUBLIC_MODUSIGN_KEY}`,
    },
    body: JSON.stringify({
      accessibleByParticipant: false,
      message: '서명 취소',
    }),
  };

  return fetch(url, options).then((res: Response) => res.json());
};
