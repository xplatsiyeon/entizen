/** @format */

import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className='bg-black w-full font-Pretendard'>
      <div className='w-10/12 py-24 flex flex-col gap-10 mx-auto sm:w-11/12'>
        <h3 className='text-white text-xl font-bold sm:text-base'>XPLAT(엑스플랫)</h3>
        <div className='text-white flex flex-col gap-1 sm:hidden'>
          <span>대표 김지우ㅣ사업자등록번호 583-87-02936</span>
          <span>서울특별시 강서구 양천로 357 려산빌딩 7층 ㅣ 070-4539-2782</span>
          <p>
            <span>
              <u>
                <Link href=''>서비스이용약관</Link>
              </u>
            </span>
            ㅣ
            <span> 
              <u>
                <Link href=''>개인정보처리방침</Link>
              </u>
            </span>
          </p>
        </div>
        <div className='text-white flex-col gap-2 hidden sm:flex sm:text-sm'>
          <span>대표 ㅣ 김지우</span>
          <span>사업자등록번호 ㅣ 583-87-02936</span>
          <span>서울특별시 강서구 양천로 357 려산빌딩 7층</span>
          <span>070-4539-2782</span>
          <p className='pt-6'>
            <span>
              <u>
                <Link href=''>서비스이용약관</Link>
              </u>
            </span>
            ㅣ
            <span>
              <u>
                <Link href=''>개인정보처리방침</Link>
              </u>
            </span>
          </p>
        </div>
        <span className='text-white'>Copyright by XPLAT. All rights reserved.</span>
      </div>
    </div>
  );
};

export default Footer;
