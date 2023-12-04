// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  msg: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // 자피어 보내기
  const url = 'https://hooks.zapier.com/hooks/catch/8791679/3f1qgqv/';
  const { data } = req.body;

  const sendData = {
    companyName: data.companyName,
    phone: data.phone,
  };

  axios
    .post(url, {
      data: sendData,
    })
    .then((res) => {
      console.log(res);
    });

  res.status(200);
}
