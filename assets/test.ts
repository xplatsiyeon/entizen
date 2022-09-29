// {
//   "chargers": [
//       {
//           /*
//           * A-B-C 로 형식으로 와트_타입_버스구분 형식
//           * A: 3.5 | 7 | 100 등
//           * B: CHARGING_CONSENT: 과금형 콘센트 | HOME: 가정용 | COMMON_ECONOMY: 공용 경제형 | COMMON: 공용
//           * C: 버스 충전타입인 경우 BUS, 없는 경우 C 제외
//           * ex)
//           * 3.5 kW 과금형 콘센트: 3.5-CHARGING_CONSENT
//           * 7 kW 홈 충전기(가정용): 7-HOME
//           * 300 kW 충전기 (버스): 300-COMMON-BUS
//           */
//           "kind": "3.5-CHARGING_CONSENT",
//           // 스탠드타입: WALL: 벽걸이 | KIOSK: 키오스크 | STAND: 스탠드 | DETACHABLE_POWER_BANK: 파워뱅크 분리형 | "": 없는 경우
//           "standType": "",
//           // 채널: SINGLE: 싱글 | DUAL: 듀얼 | 3_MODE: 3모드
//           "channel": "SINGLE",
//           "count": 1
//       },
//       {
//           "kind": "7-HOME",
//           "standType": "WALL",
//           "channel": "SINGLE",
//           "count": 1
//       }
//   ],
//   // 구독 상품 ENTIRETY: 전체 구독 | PART: 부분 구독
//   "subscribeProduct": "ENTIRETY",
//   // 수익(투자)비율
//   "investRate": "1",
//   // 구독 기간 24 | 26 | 48 | 60
//   "subscribePeriod": "36",
//   "installationAddress": "서울특별시 강서구 공항대로 186",
//   // 설치 장소: OUTSIDE: 집 밖 | INSIDE: 집 안
//   "installationLocation": "INSIDE"
// }
