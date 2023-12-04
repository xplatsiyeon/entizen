// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  msg: string;
};

export default function submitprivate(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // 자피어 보내기
  const url = 'https://hooks.zapier.com/hooks/catch/8791679/3f2b75d/';
  const { data } = req.body;

  const sendData = {
    selection: data.selection,
    importantFactor: data.importantFactor,
    place: data.place,
    placeEtc: data.placeEtc,
    address: data.address,
    addressDetail: data.addressDetail,
    phone: data.phone,
    email: data.email,
    isAgree: data.isAgree,
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
