"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import WebHeaderA from "../../../components/brought/newHeader/BeforeHeaderA";
import WebHeaderC from "../../../components/brought/newHeader/BeforeHeaderC";
import WebHeaderD from "../../../components/brought/newHeader/BeforeHeaderD";
import WebHeaderB from "../../../components/brought/newHeader/BeforeHeaderB";
// import WebFooter from 'componentsWeb/WebFooter';
import { Box } from "@mui/system";
import {
  RadioButtonCheckedSharp,
  RadioButtonUncheckedSharp,
} from "@mui/icons-material";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import styles from "../form.module.css";
import classNames from "classnames";
import MobileModal from "../termsDetail";
// import Common from 'components/guide/common';
import CommonBackdrop from "../../commonBackdrop";
import TagManager from "react-gtm-module";
import axios from "axios";

declare global {
  interface Window {
    daum: any;
  }
}
interface IAddr {
  address: string;
  zonecode: string;
}

const EstimateForm = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({
    query: "(max-width:899.25pt)",
  });
  const size = isMobile ? "medium" : "small";

  const onClickAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: IAddr) {
        (document.getElementById("addressInput") as HTMLInputElement).value =
          data.address;
        document.getElementById("addressDetailInput")?.focus();

        setForm({ ...form, address: data.address });
      },
    }).open();
  };

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // values
  const [isComplete, setIsComplete] = React.useState<boolean>(false);
  const [form, setForm] = React.useState<{
    importantFactor?: string | undefined;
    progress?: string | undefined;
    address?: string | undefined;
    addressDetail?: string | undefined;
    phone?: string | undefined;
    email?: string | undefined;
    isAgree?: boolean | undefined;
  }>({});

  // validation
  const validateForm = (formData: any) => {
    if (
      formData?.importantFactor &&
      formData?.progress &&
      formData?.address &&
      formData?.addressDetail &&
      formData?.phone &&
      formData?.email &&
      formData?.isAgree &&
      formData.isAgree
    ) {
      setIsComplete(true);
    } else {
      setIsComplete(false);
    }
  };
  const handleChange = (event: any) => {
    const name = event.target.name as keyof typeof form;
    const value =
      name === "isAgree" ? event.target.checked : event.target.value;
    const formData = { ...form, [name]: value };
    setForm(formData);

    validateForm(formData);
  };

  const [backdropOpen, setBackdropOpen] = React.useState(false);
  const onClickSubmit = () => {
    if (isComplete) {
      console.log("isComplete");
      setBackdropOpen(true);

      setTimeout(() => {
        setBackdropOpen(false);

        const sendData = {
          selection: "입주민공용",
          importantFactor: form.importantFactor, // 가장 중요하게 보는 요소
          place: form.progress, // 진행 상황
          address: form.address, // 설치 희망 주소
          addressDetail: form.addressDetail, // 설치 희망 상세 주소
          email: form.email, // 이메일 주소
          phone: form.phone, // 연락 가능한 휴대폰 번호
          isAgree: form.isAgree, // 개인정보 동의 여부
          utm_source: sessionStorage.getItem("utm_source"),
          utm_medium: sessionStorage.getItem("utm_medium"),
          utm_campaign: sessionStorage.getItem("utm_campaign"),
          utm_content: sessionStorage.getItem("utm_content"),
          utm_term: sessionStorage.getItem("utm_term"),
        };

        sessionStorage.setItem(
          "importantFactor",
          form.importantFactor as string,
        );
        sessionStorage.setItem("place", form.progress as string);
        sessionStorage.setItem("address", form.address as string);
        sessionStorage.setItem("addressDetail", form.addressDetail as string);
        sessionStorage.setItem("email", form.email as string);
        sessionStorage.setItem("phone", form.phone as string);
        sessionStorage.setItem("phone_number", form.phone as string);

        axios.post("/zapier/submit", { data: sendData }).then(() => {});

        //GA4 이벤트 전송
        const tagManagerArgs = {
          dataLayer: {
            event: "lead_submit",
          },
        };
        TagManager.dataLayer(tagManagerArgs);
        router.push("/estimateForm/complete");
      }, 3000);
    }
  };

  useEffect(() => {
    //GA4 이벤트 전송
    const tagManagerArgsForm = {
      dataLayer: {
        event: "lead_start",
      },
    };
    TagManager.dataLayer(tagManagerArgsForm);
  }, []);

  return (
    <div id="estimateForm" className={styles.estimateForm}>
      {isMobile ? <WebHeaderC /> : <WebHeaderD />}
      <section className={styles.sec_01}>
        <div className={styles.container}>
          <div className={styles.title}>
            {isMobile ? (
              <p>
                문항에 답하고 한 눈에 비교할 수 <br />
                있는 맞춤 견적서를 받아보세요
              </p>
            ) : (
              <p>
                문항에 답하고 한 눈에 비교할 수 있는
                <br />
                맞춤 견적서를 받아보세요
              </p>
            )}
          </div>
          <div className={styles.form_container}>
            <Box
              component="form"
              noValidate
              onSubmit={() => {
                console.log("submit!");
              }}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2} columns={1}>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>가장 중요하게 보는 요소</label>
                  <Select
                    size={size}
                    id="importantFactorSelect"
                    name="importantFactor"
                    displayEmpty
                    className={styles.input_box}
                    value={form?.importantFactor ?? ""}
                    placeholder="클릭하여 선택하세요."
                    onChange={handleChange}
                  >
                    <MenuItem
                      value="설치비용"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      설치비용
                    </MenuItem>
                    <MenuItem
                      value="충전요금"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      충전요금
                    </MenuItem>
                    <MenuItem
                      value="A/S"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      A/S
                    </MenuItem>
                    <MenuItem
                      value="디자인"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      디자인
                    </MenuItem>
                    <MenuItem
                      value="편의성"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      편의성
                    </MenuItem>
                    <MenuItem
                      value="보증기간"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      보증기간
                    </MenuItem>
                    <MenuItem
                      value="업체 신뢰도"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      업체 신뢰도
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>진행 상황</label>
                  <Select
                    size={size}
                    id="progressSelect"
                    name="progress"
                    className={styles.input_box}
                    value={form?.progress ?? ""}
                    placeholder="클릭하여 선택하세요."
                    onChange={handleChange}
                  >
                    <MenuItem
                      value="(1단계) 사전 정보 수집"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      (1단계) 사전 정보 수집
                    </MenuItem>
                    <MenuItem
                      value="(2단계) 입주민 의견 및 수요 조사"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      (2단계) 입주민 의견 및 수요 조사
                    </MenuItem>
                    <MenuItem
                      value="(3단계) 관리 사무소 또는 입대위 건의"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      (3단계) 관리 사무소 또는 입대위 건의
                    </MenuItem>
                    <MenuItem
                      value="(4단계) 입대위 안건 상정"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      (4단계) 입대위 안건 상정
                    </MenuItem>
                    <MenuItem
                      value="(5단계) 입대위 안건 승인"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      (5단계) 입대위 안건 승인
                    </MenuItem>
                    <MenuItem
                      value="(기타) 신축 아파트(사용 승인 전)"
                      sx={{
                        color: "#222",
                        fontSize: "14px",
                        fontWeight: "400",
                        fontFamily: "Spoqa Han Sans Neo",
                        fontStyle: "normal",
                      }}
                    >
                      (기타) 신축 아파트(사용 승인 전)
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>설치 희망 상세 주소</label>
                  <div className={styles.search_address_wrapper}>
                    <TextField
                      id="addressInput"
                      size={size}
                      placeholder="주소 검색"
                      disabled
                      className={classNames(styles.input_box, styles.address)}
                      variant="outlined"
                      name="address"
                      value={form?.address ?? ""}
                      onChange={handleChange}
                    />
                    <Button
                      className={styles.address_btn}
                      variant="contained"
                      onClick={onClickAddr}
                    >
                      주소 찾기
                    </Button>
                  </div>
                  <TextField
                    id="addressDetailInput"
                    className={styles.input_box}
                    size={size}
                    placeholder="상세 주소를 입력해주세요"
                    variant="outlined"
                    name="addressDetail"
                    value={form?.addressDetail ?? ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>연락 가능한 휴대폰 번호</label>
                  <TextField
                    id="phoneInput"
                    className={styles.input_box}
                    size={size}
                    placeholder="연락처를 입력해 주세요"
                    variant="outlined"
                    name="phone"
                    value={form?.phone ?? ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>이메일 주소</label>
                  <TextField
                    id="emailInput"
                    className={styles.input_box}
                    size={size}
                    placeholder="이메일을 입력해 주세요"
                    variant="outlined"
                    name="email"
                    value={form?.email ?? ""}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  <label>개인정보 동의 안내</label>
                  <div className={styles.terms_container}>
                    <div className={styles.terms_check}>
                      <Checkbox
                        icon={<RadioButtonUncheckedSharp />}
                        checkedIcon={<RadioButtonCheckedSharp />}
                        checked={form?.isAgree || false}
                        name="isAgree"
                        onChange={handleChange}
                      />
                      <span>
                        <span className={styles.required_check}>[필수]</span>{" "}
                        개인정보 수집 및 이용 안내에 대한 동의
                      </span>
                    </div>
                    <div className={styles.terms_detail}>
                      <Button
                        className={styles.terms_detail_btn}
                        variant="text"
                        onClick={handleOpenModal}
                      >
                        약관 상세보기
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item className={styles.item} xs={12} sm={6}>
                  {!isMobile && (
                    <Button
                      className={classNames(
                        styles.submit_btn,
                        isComplete && styles.active,
                      )}
                      variant="contained"
                      color="primary"
                      onClick={onClickSubmit}
                    >
                      내 맞춤 견적서 확인하기
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </div>
          {isMobile && (
            <Button
              className={classNames(
                styles.submit_btn,
                isComplete && styles.active,
              )}
              variant="contained"
              color="primary"
              onClick={onClickSubmit}
            >
              내 맞춤 견적서 확인하기
            </Button>
          )}
        </div>
        <CommonBackdrop open={backdropOpen} />
        <MobileModal open={modalOpen} onClose={handleCloseModal} />
      </section>
      <section className={styles.sec_02}></section>
    </div>
  );
};

export default EstimateForm;
