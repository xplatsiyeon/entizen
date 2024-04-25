/** @format */

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Tab1 from "/public/components/tabs/tab1.png";
import TTab1 from "/public/components/tabs/t_tab1.png";
import MTab1 from "/public/components/tabs/m_tab1.png";
import Tab2 from "/public/components/tabs/tab2.png";
import Tab3 from "/public/components/tabs/tab3.png";
import Tab4 from "/public/components/tabs/tab4.png";
import Logo from "/public/components/tabs/logo.png";

const Tabs = () => {
  const [openTab, setOpenTab] = useState(1);
  return (
    <>
      <div className="flex mt-20 sm:mt-5 sm:justify-center">
        <div className="w-[1180px] mo:w-[600px] sm:w-11/12">
          <ul
            className="flex mb-0 list-none pt-3 flex-row md:flex-wrap md:flex"
            role="tablist"
          >
            <li className="text-center flex-auto md:basis-1/2">
              <a
                className={
                  "text-xl px-8 py-6 block leading-normal sm:text-sm " +
                  (openTab === 1
                    ? "text-black font-bold bg-white border-t-4 border-blue md:bg-blue md:text-white "
                    : "text-[#969696] bg-[#F9F9F9]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                그로스해킹 및<br />
                전략 컨설팅
              </a>
            </li>
            <li className="flex-auto text-center md:basis-1/2">
              <a
                className={
                  "text-xl px-8 py-6 block leading-normal sm:text-sm " +
                  (openTab === 2
                    ? "text-black font-bold bg-white border-t-4 border-blue md:bg-blue md:text-white "
                    : "text-[#969696] bg-[#F9F9F9]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                스타트업 지원 및<br />
                강연 및 멘토링 사업
              </a>
            </li>
            <li className="flex-auto text-center md:basis-1/2">
              <a
                className={
                  "text-xl px-8 py-6 block leading-normal sm:text-sm " +
                  (openTab === 3
                    ? "text-black font-bold bg-white border-t-4 border-blue md:bg-blue md:text-white "
                    : "text-[#969696] bg-[#F9F9F9]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                투자 자문 및<br />
                투자, 창업
              </a>
            </li>
            <li className="flex-auto text-center md:basis-1/2">
              <a
                className={
                  "text-xl px-8 py-6 block leading-normal sm:text-sm " +
                  (openTab === 4
                    ? "text-black font-bold bg-white border-t-4 border-blue md:bg-blue md:text-white "
                    : "text-[#969696] bg-[#F9F9F9]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                이커머스
                <br />
                데이터분석 솔루션
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <div className="flex justify-center items-center py-20 sm:py-10">
                    <Image
                      src={Tab1}
                      alt="tab1_table"
                      className="w-10/12 md:hidden"
                    />
                    <Image
                      src={TTab1}
                      alt="tab1_table"
                      className="w-10/12 hidden mo:block"
                    />
                    <Image
                      src={MTab1}
                      alt="tab1_table"
                      className="w-10/12 hidden sm:block"
                    />
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="flex justify-center items-center py-20 gap-14 md:flex-col md:pt-10 sm:py-10">
                    <Image src={Tab2} alt="tab1_table" className="md:w-11/12" />
                    <div className="flex flex-col gap-14">
                      <div className="md:px-6">
                        <div className="w-14 h-1 bg-blue"></div>
                        <div className="mt-7 sm:mt-4">
                          <p className="text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm">
                            서울창업허브, 스파크랩, 충북바이오융합본부,
                            강원창조경제센터, 콘텐츠진흥원, 인천TP, 동국대,
                            인하대 등 스타트업 육성을 위한 지원사업, 강연,
                            멘토링 프로그램 운영 및 참여
                          </p>
                          <div className="flex gap-5 flex-wrap w-[600px] mt-5 md:w-full hidden">
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                            <Image src={Logo} alt="company_logo" />
                          </div>
                        </div>
                      </div>
                      <div className="md:px-6">
                        <div className="w-14 h-1 bg-blue"></div>
                        <div className="mt-7 sm:mt-4">
                          <p className="text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm">
                            정부 지원 프로그램, 강연, 멘토링 200회 이상 수행
                            <br />
                            (스타트업 등 기업 POOL 확보)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <div className="flex justify-center items-center py-20 gap-14 md:flex-col md:pt-10 sm:py-10">
                    <Image src={Tab3} alt="tab1_table" className="md:w-11/12" />
                    <div className="flex flex-col gap-14 ">
                      <div className="md: px-6">
                        <div className="w-14 h-1 bg-blue"></div>
                        <div className="mt-7 sm:mt-4">
                          <p className="text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm">
                            직접투자, 후속투자 연계, 사업 기획, BM 진단 등의
                            컨설팅부터 컴퍼니빌더 방식 공동 창업 진행
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <div className="flex justify-center items-center py-20 gap-14 md:flex-col md:pt-10 sm:py-10">
                    <Image src={Tab4} alt="tab1_table" className="md:w-11/12" />
                    <div className="flex flex-col gap-14 ">
                      <div className="md:px-6">
                        <div className="w-14 h-1 bg-blue"></div>
                        <div className="mt-7 sm:mt-4">
                          <p className="text-textBlack text-xl font-bold w-[600px] break-keep leading-relaxed md:w-full sm:text-sm">
                            이커머스 성장에 필요한 핵심지표와
                            행동추천(의사결정)을 메세징 형태로 쉽고 편리하게
                            받아 볼 수 있는 AI 데이터분석 솔루션 제공
                          </p>
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

export default Tabs;
