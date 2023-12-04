// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  msg: string
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // 자피어 보내기
  const url = "https://hooks.zapier.com/hooks/catch/8791679/3f4shlg/";

  /*
  const sendData = {
    selection: selection,
    importantFactor:importantFactor,
    place:place,
    placeEtc:placeEtc,
    address:address,
    addressDetail:addressDetail,
    phone:phone,
    isAgree:isAgree
  };
  */
  
  axios
    .post(url, {
      data: {data:'data'},
    })
    .then((res) => {
      console.log(res)
    });

  res.status(200).json({msg:'success'});
}


