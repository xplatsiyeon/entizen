/** @format */

"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Tab1 from '/public/pages/work/tab1.png';
import Tab2 from '/public/pages/work/tab2.png';

const Tabs2 = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className='flex mt-20 pb-36 sm:mt-5 sm:justify-center'>
        <div className='w-[1024px] mx-auto mo:w-[600px] sm:w-11/12'>
          <ul className='flex mb-0 list-none pt-3 flex-row' role='tablist'>
            <li className='flex-auto text-center md:basis-1/3'>
              <a
                className={
                  'text-xl px-8 py-6 block leading-normal sm:text-sm sm:px-4 sm:py-6 ' +
                  (openTab === 1 ? 'text-black font-bold bg-white border-t-4 border-blue md:bg-blue md:text-white ' : 'text-[#969696] bg-[#F9F9F9]')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'>
                PMF 검증 <br className='hidden md:block' />
                프로젝트
              </a>
            </li>
            <li className='flex-auto text-center md:basis-1/3 '>
              <a
                className={
                  'text-xl px-8 py-6 block leading-normal sm:text-sm sm:px-4 sm:py-6 ' +
                  (openTab === 2 ? 'text-black font-bold bg-white border-t-4 border-blue md:bg-blue md:text-white ' : 'text-[#969696] bg-[#F9F9F9]')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle='tab'
                href='#link2'
                role='tablist'>
                투자유치 <br className='hidden md:block' />
                프로젝트
              </a>
            </li>
            <li className='flex-auto text-center md:basis-1/3'>
              <a
                className={
                  'text-xl px-8 py-6 block leading-normal sm:text-sm sm:px-4 sm:py-6 ' +
                  (openTab === 3 ? 'text-black font-bold bg-white border-t-4 border-blue md:bg-blue md:text-white ' : 'text-[#969696] bg-[#F9F9F9]')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle='tab'
                href='#link3'
                role='tablist'>
                스케일업 <br className='hidden md:block' />
                프로젝트
              </a>
            </li>
          </ul>
          <div className='relative flex flex-col min-w-0 break-words bg-white w-full mb-6'>
            <div className='px-4 py-5 flex-auto'>
              <div className='tab-content tab-space'>
                <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                  <div className='flex justify-center items-center py-20 gap-14 md:flex-col md:pt-10 sm:py-10'>
                    <Image src={Tab1} alt='tab1_table' className='md:w-2/3 mo:p-8' />
                    <div className='flex flex-col gap-14 sm:gap-10'>
                      <div className='mo:px-6 sm:px-2'>
                        <div className='w-14 h-1 bg-blue'></div>
                        <div className='mt-7 sm:mt-4'>
                          <p className='text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm'>
                            L모 대기업의 사내벤처팀은 전기차 충전기 서비스 시장 진출 전 자사 비즈니스 모델에 대한 PMF (시장 적합도) 검증을 의뢰하였습니다.
                          </p>
                        </div>
                      </div>
                      <div className='mo:px-6 sm:px-2'>
                        <div className='w-14 h-1 bg-blue'></div>
                        <div className='mt-7 sm:mt-4'>
                          <p className='text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm'>
                            K모 대기업의 사내벤처팀은 퀵서비스 런칭 전 시장 조사를 위해 K모 대기업의 사내벤처팀은 퀵서비스 런칭 전 시장 조사를 위해
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                  <div className='flex justify-center items-center py-20 gap-14 md:flex-col md:pt-10 sm:py-10'>
                    <Image src={Tab2} alt='tab1_table' className='md:w-11/12' />
                    <div className='flex flex-col gap-14 sm:gap-10'>
                      <div className='mo:px-6 sm:px-2'>
                        <div className='w-14 h-1 bg-blue'></div>
                        <div className='mt-7 sm:mt-4'>
                          <p className='text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm'>
                            바이오기업 A는 자사 브랜드의 성장과 투자유치를 위해 XPLAT에게 마케팅 총괄 의뢰하였고 성장을 통해 아기 유니콘 선정 기여하였습니다.
                          </p>
                        </div>
                      </div>
                      <div className='mo:px-6 sm:px-2'>
                        <div className='w-14 h-1 bg-blue'></div>
                        <div className='mt-7 sm:mt-4'>
                          <p className='text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm'>
                            앱/ 패션커머스 기업 B는 시리즈 B 투자를 위해 XPLAT에게 이커머스 마케팅 총괄을 의뢰하였습니다. 1년 6개월 동안 성장했습니다.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={openTab === 3 ? 'block' : 'hidden'} id='link3'>
                  <div className='flex justify-center items-center py-20 gap-14 md:flex-col md:pt-10 sm:py-10'>
                    <Image src={Tab2} alt='tab1_table' className='md:w-11/12' />
                    <div className='flex flex-col gap-14 sm:gap-10'>
                      <div className='mo:px-6 sm:px-2'>
                        <div className='w-14 h-1 bg-blue'></div>
                        <div className='mt-7 sm:mt-4'>
                          <p className='text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm'>
                            디퓨저 브랜드 A는 매출의 급속성장을 의뢰했습니다. 반년 내 8배 성장 기여했습니다.
                          </p>
                        </div>
                      </div>
                      <div className='mo:px-6 sm:px-2'>
                        <div className='w-14 h-1 bg-blue'></div>
                        <div className='mt-7 sm:mt-4'>
                          <p className='text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm'>2년 내 아동복 브랜드 약 5배 이상 성장하였습니다.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs2;
