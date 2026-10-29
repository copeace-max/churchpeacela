/* =====================================================================
   설교 · 쇼츠 목록 (유튜브 @churchpeace 에서 가져옴)
   새 설교가 올라오면 맨 위에 한 줄 추가하면 됩니다.
   id 는 유튜브 주소의 v= 뒤 11글자 (쇼츠는 /shorts/ 뒤 11글자)
   ===================================================================== */
const SERMONS = [
  { id: "wie4XRSFZls", title: "“무지개를 잘못 읽은 사람” (feat. 토마스 뮌처)", date: "2026-10-25", len: "33:35" },
  { id: "wH0RMrsG1jQ", title: "“완벽한 집에는 귀신이 산다”", date: "2026-10-18", len: "29:28" },
  { id: "6of3xdHwSrM", title: "“존 웨인과 인디언 — 힘이 있을 때 드러나는 영혼”", date: "2026-10-11", len: "34:25" },
  { id: "WE28BE4SWcU", title: "“네가 무엇을 먹는지 말해 보라. 그러면 나는 네가 어떤 사람인지 말해 주겠다”", date: "2026-10-04", len: "32:16" },
  { id: "a1kE6WDGn9U", title: "“우리 중에 누구를 만나러 오셨습니까?” (feat. 도로시 데이)", date: "2026-09-27", len: "38:42" },
  { id: "oeVUlb3kD4s", title: "“그리고 로마는 그들을 보았다”", date: "2026-09-20", len: "34:26" },
  { id: "PjVog7Bikis", title: "“림몬의 신당에서”", date: "2026-09-13", len: "36:39" },
  { id: "7Drp78ywapY", title: "“신(神)은 사양하겠습니다”", date: "2026-09-06", len: "34:06" },
  { id: "RY2MZDopt5c", title: "“에바다 — 헤벨의 소리를 들으시는 하나님”", date: "2026-08-30", len: "39:46" },
  { id: "oe6PRMpv150", title: "“오이코스와 폴리스” (feat. 오디세이)", date: "2026-08-23", len: "36:35" },
  { id: "XIJUerYHAPw", title: "“탈식민주의 성서비평으로 읽는 수로보니게 여인” (광복 81주년 평화주일)", date: "2026-08-16", len: "36:06" },
  { id: "Pi7_nY02gT8", title: "“아담의 언어, 바벨의 언어, 예수의 언어”", date: "2026-08-09", len: "1:05:54" },
  { id: "CSl3ERGxQuI", title: "“하나님 나라는 재즈와 블루스처럼 2” — 이욱종 목사", date: "2026-07-26", len: "1:12:42" },
  { id: "ceSR2IskSdA", title: "“인간적 번영과 하나님 나라의 삶”", date: "2026-07-19", len: "59:51" },
  { id: "1fGlmSlE24k", title: "“창조는 아직 오고 있다” (feat. 제임스웹 우주망원경)", date: "2026-07-12", len: "42:45" },
  { id: "xJBpigOJNhc", title: "“빈티지가 된 나라, 약속을 향한 백성”", date: "2026-07-05", len: "33:51" },
  { id: "dBN5PpxDpVw", title: "“벽에 쓰인 글씨, 땅에 쓴 글씨”", date: "2026-06-28", len: "31:43" },
  { id: "44RXkVb02SQ", title: "“아버지의 이름으로”", date: "2026-06-21", len: "1:14:05" },
  { id: "SQfE43nfHrg", title: "“하나님은 정말 공정하실까?”", date: "2026-06-14", len: "33:28" },
  { id: "Cd1wmYnvcxE", title: "“나를 이스마엘이라 부르시오!” (feat. 모비딕)", date: "2026-06-07", len: "35:17" },
];

const SHORTS = [
  { id: "VkNB8QCOQdk", title: "완벽한 병실에는 귀신이 산다" },
  { id: "HjypcVQ-sRw", title: "예수와 존 웨인, 그리고 인디언" },
  { id: "_DT8_MBPfoE", title: "작은 동물에게 젖을 먹이는 이사야" },
  { id: "qdDxU8_7HbM", title: "네가 무엇을 먹는지 말해 보아라" },
  { id: "7TysQc3RhLk", title: "우리 중 누구를 만나러 오셨습니까?" },
  { id: "rFFw87eNfRI", title: "욕먹어 싼 교회, 욕먹어 자랑스런 교회" },
  { id: "35x9zfgS8Yk", title: "" },
  { id: "FjW2QQGRUtI", title: "목회서신 (08.30.26)" },
  { id: "B4eU7E556H0", title: "헛되다는 게 신앙의 디폴트값" },
  { id: "mRkfkGElIYQ", title: "사마리아 여인의 남편은 라칵의 상징계" },
  { id: "tyGEuER3gnE", title: "No King in LA" },
  { id: "Ezxy8XfgVZI", title: "그들이 중국을 두려워하는 이유" },
  { id: "okVRFvEGbD4", title: "" },
  { id: "XluTsdXGHEU", title: "개신교인 여러분, 제발 가짜 뉴스에 속지 마세요" },
  { id: "Uqw4q5Fc1Ck", title: "내란에 동조한 목사들" },
  { id: "HZrjGPzf7yQ", title: "마름으로 살지 맙시다" },
  { id: "VA8OirY0NAI", title: "눈물이 찾아올 때 내 몸은 턩 빈 항아리가 되지" },
  { id: "7p3xrJ9Q-2s", title: "모두 내려 놓은 바보 예수" },
];
