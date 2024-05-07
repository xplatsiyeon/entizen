import { atom } from "jotai";

interface formTypes {
  name: string; // 사용자 이름
  phone: string; // 사용자 연락처
  place: string; // 설치 장소
  placeEtc?: string; // 설치 장소에서 기타 선택시
  possess: string; // 전기차 보유 여부
  modelName: string; // 모델명
  isAgree: boolean; // 개인정보 수집및 동의 여부
}

interface setAtomTypes {
  name: string;
  value: any;
}
export const dataAtom = atom<formTypes>({
  name: "",
  phone: "",
  place: "",
  possess: "",
  modelName: "",
  isAgree: false,
});

export const estimateIsValidAtom = atom<boolean>(false);

// dataAtom 설정 Atom
export const setDataAtom = atom(
  null,
  (get, set, { name, value }: setAtomTypes) => {
    const prevData = get(dataAtom);
    const data = { ...prevData, [name]: value };
    set(dataAtom, data);

    const values = Object.values(data);

    if (!values.includes("") && !values.includes(false)) {
      set(estimateIsValidAtom, true);
    } else {
      set(estimateIsValidAtom, false);
    }
  },
);

//sessionData 데이터 설정 Atom
export const setSessionDataAtom = atom(
  null,
  (get, set, sessionData: formTypes) => {
    set(dataAtom, { ...sessionData });
  },
);
