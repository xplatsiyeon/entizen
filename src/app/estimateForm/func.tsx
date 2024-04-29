import React from "react";

interface formType {
  importantFactor?: string | undefined;
  progress?: string | undefined;
  address?: string | undefined;
  addressDetail?: string | undefined;
  phone?: string | undefined;
  email?: string | undefined;
  isAgree?: boolean | undefined;
  place?: string | undefined;
  placeEtc?: string | undefined;
}

const validateReg = (type: string, data: string) => {
  let reg;
  if (!type || !data || typeof data === undefined) return false;
  switch (type) {
    case "phone":
      reg = /^([0-9]){10,11}$/;
      break;
    case "email":
      reg = /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      break;
    default:
      reg = /.*/;
      break;
  }

  if (reg.test(data)) {
    return true;
  } else {
    return false;
  }
};

const sendData = (form: any, type: string) => {
  let data = {};
  switch (type) {
    case "입주민공용":
      data = {
        selection: "입주민공용",
        importantFactor: form.importantFactor,
        place: form.progress,
        address: form.address,
        addressDetail: form.addressDetail,
        email: form.email,
        phone: form.phone,
        isAgree: form.isAgree,
      };
      break;
    case "모객용도":
      data = {
        selection: "모객용도",
        importantFactor: form.importantFactor,
        place: form.place,
        placeEtc: form.placeEtc,
        address: form.address,
        addressDetail: form.addressDetail,
        email: form.email,
        phone: form.phone,
        isAgree: form.isAgree,
      };
      break;
    case "충전수익":
      data = {
        selection: "충전수익",
        importantFactor: form.importantFactor,
        place: form.place,
        placeEtc: form.placeEtc,
        address: form.address,
        addressDetail: form.addressDetail,
        email: form.email,
        phone: form.phone,
        isAgree: form.isAgree,
      };
      break;
    case "개인용도":
      data = {
        selection: "개인용도",
        importantFactor: form.importantFactor,
        place: form.place,
        placeEtc: form.placeEtc,
        phone: form.phone,
        isAgree: form.isAgree,
      };
      break;

    case "selection":
      data = {
        company: form.company,
        address: form.address,
        addressDetail: form.addressDetail,
        isAgree: form.isAgree,
        phone: sessionStorage.getItem("phone"),
      };
      break;
    default:
      break;
  }
  if (type === "selection") {
    return data;
  } else {
    return {
      ...data,
      utm_source: sessionStorage.getItem("utm_source"),
      utm_medium: sessionStorage.getItem("utm_medium"),
      utm_campaign: sessionStorage.getItem("utm_campaign"),
      utm_content: sessionStorage.getItem("utm_content"),
      utm_term: sessionStorage.getItem("utm_term"),
    };
  }
};

export const dataCheck = (
  form: formType,
  isComplete: boolean,
  type: string,
) => {
  if (!form) return;
  const phoneCheck = validateReg("phone", String(form.phone));
  const emailCheck = validateReg("email", String(form.email));
  // 작성여부 / 휴대폰번호 / 이메일 검증
  if (isComplete && phoneCheck && emailCheck) {
    if (type === "입주민공용") {
      sessionStorage.setItem("importantFactor", form.importantFactor as string);
      sessionStorage.setItem("place", form.progress as string);
      sessionStorage.setItem("address", form.address as string);
      sessionStorage.setItem("addressDetail", form.addressDetail as string);
      sessionStorage.setItem("email", form.email as string);
      sessionStorage.setItem("phone", form.phone as string);
      sessionStorage.setItem("phone_number", form.phone as string);
    } else if (type === "모객용도" || type === "충전수익") {
      sessionStorage.setItem("importantFactor", form.importantFactor as string);
      sessionStorage.setItem("place", form.place as string);
      sessionStorage.setItem("placeEtc", form.placeEtc as string);
      sessionStorage.setItem("address", form.address as string);
      sessionStorage.setItem("addressDetail", form.addressDetail as string);
      sessionStorage.setItem("email", form.email as string);
      sessionStorage.setItem("phone", form.phone as string);
      sessionStorage.setItem("phone_number", form.phone as string);
    } else if (type === "개인용도") {
      sessionStorage.setItem("importantFactor", form.importantFactor as string);
      sessionStorage.setItem("place", form.place as string);
      sessionStorage.setItem("placeEtc", form.placeEtc as string);
      sessionStorage.setItem("phone", form.phone as string);
      sessionStorage.setItem("phone_number", form.phone as string);
    }

    return sendData(form, type);
  } else {
    return null;
  }
};
