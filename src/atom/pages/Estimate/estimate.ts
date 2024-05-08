import { formTypes, setAtomTypes } from "./types";
import { atom } from "jotai";

// 사전정보 ATOM[E]
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
// 사전정보 ATOM[E]
