/* =====================================================================
   교회 사진첩 & 주보
   사진은 GitHub 저장소에 올린 뒤 파일 이름만 적으면 됩니다.
   ===================================================================== */

/* ---------------------------------------------------------------------
   주보 — 맨 위가 가장 최근 주보입니다.
   pages 에 주보 이미지 파일 이름을 순서대로 적으세요.
   --------------------------------------------------------------------- */
const BULLETINS = [
  {
    date: "2026-11-01",
    title: "2026년 11월 1일 주보 (52권 42호)",
    pages: ["bulletin-20261101-p1.jpg", "bulletin-20261101-p2.jpg"],
  },
];

/* ---------------------------------------------------------------------
   교회 사진첩 — photos/ 폴더에 올린 사진 목록입니다. (최근 사진이 위)
   사진을 추가하실 때는 photos/ 폴더에 올리고 아래 목록에 파일 이름을
   한 줄 적어 주시면 사진첩에 바로 나타납니다.
   --------------------------------------------------------------------- */
const PHOTOS = [
  "photos/fb-001.jpg", "photos/fb-002.jpg", "photos/fb-003.jpg", "photos/fb-004.jpg",
  "photos/fb-005.jpg", "photos/fb-006.jpg", "photos/fb-007.jpg", "photos/fb-008.jpg",
  "photos/fb-009.jpg", "photos/fb-010.jpg", "photos/fb-011.jpg", "photos/fb-012.jpg",
  "photos/fb-013.jpg", "photos/fb-014.jpg", "photos/fb-015.jpg", "photos/fb-016.jpg",
  "photos/fb-017.jpg", "photos/fb-018.jpg", "photos/fb-019.jpg", "photos/fb-020.jpg",
  "photos/fb-021.jpg", "photos/fb-022.jpg", "photos/fb-023.jpg", "photos/fb-024.jpg",
  "photos/fb-025.jpg", "photos/fb-026.jpg", "photos/fb-027.jpg", "photos/fb-028.jpg",
  "photos/fb-029.jpg", "photos/fb-030.jpg", "photos/fb-031.jpg", "photos/fb-032.jpg",
  "photos/fb-033.jpg", "photos/fb-034.jpg", "photos/fb-035.jpg", "photos/fb-036.jpg",
  "photos/fb-037.jpg", "photos/fb-038.jpg", "photos/fb-039.jpg", "photos/fb-040.jpg",
  "photos/fb-041.jpg", "photos/fb-042.jpg", "photos/fb-043.jpg", "photos/fb-044.jpg",
  "photos/fb-045.jpg", "photos/fb-046.jpg", "photos/fb-047.jpg", "photos/fb-048.jpg",
  "photos/fb-049.jpg", "photos/fb-050.jpg", "photos/fb-051.jpg", "photos/fb-052.jpg",
  "photos/fb-053.jpg", "photos/fb-054.jpg", "photos/fb-055.jpg", "photos/fb-056.jpg",
  "photos/fb-057.jpg", "photos/fb-058.jpg", "photos/fb-059.jpg", "photos/fb-060.jpg",
  "photos/fb-061.jpg", "photos/fb-062.jpg", "photos/fb-063.jpg", "photos/fb-064.jpg",
  "photos/fb-065.jpg", "photos/fb-066.jpg", "photos/fb-067.jpg", "photos/fb-068.jpg",
  "photos/fb-069.jpg", "photos/fb-070.jpg", "photos/fb-071.jpg", "photos/fb-072.jpg",
  "photos/fb-073.jpg", "photos/fb-074.jpg", "photos/fb-075.jpg", "photos/fb-076.jpg",
  "photos/fb-077.jpg", "photos/fb-078.jpg", "photos/fb-079.jpg", "photos/fb-080.jpg",
  "photos/fb-081.jpg", "photos/fb-082.jpg", "photos/fb-083.jpg", "photos/fb-084.jpg",
  "photos/fb-085.jpg", "photos/fb-086.jpg", "photos/fb-087.jpg", "photos/fb-088.jpg",
  "photos/fb-089.jpg", "photos/fb-090.jpg", "photos/fb-091.jpg", "photos/fb-092.jpg",
  "photos/fb-093.jpg", "photos/fb-094.jpg", "photos/fb-095.jpg", "photos/fb-096.jpg",
  "photos/fb-097.jpg", "photos/fb-098.jpg", "photos/fb-099.jpg", "photos/fb-100.jpg",
  "photos/fb-101.jpg", "photos/fb-102.jpg", "photos/fb-103.jpg", "photos/fb-104.jpg",
  "photos/fb-105.jpg", "photos/fb-106.jpg", "photos/fb-107.jpg", "photos/fb-108.jpg",
  "photos/fb-109.jpg", "photos/fb-110.jpg", "photos/fb-111.jpg", "photos/fb-112.jpg",
  "photos/fb-113.jpg", "photos/fb-114.jpg", "photos/fb-115.jpg", "photos/fb-116.jpg",
  "photos/fb-117.jpg", "photos/fb-118.jpg", "photos/fb-119.jpg", "photos/fb-120.jpg",
  "photos/fb-121.jpg", "photos/fb-122.jpg", "photos/fb-123.jpg", "photos/fb-124.jpg",
  "photos/fb-125.jpg", "photos/fb-126.jpg", "photos/fb-127.jpg", "photos/fb-128.jpg",
  "photos/fb-129.jpg", "photos/fb-130.jpg", "photos/fb-131.jpg", "photos/fb-132.jpg",
  "photos/fb-133.jpg", "photos/fb-134.jpg", "photos/fb-135.jpg", "photos/fb-136.jpg",
  "photos/fb-137.jpg", "photos/fb-138.jpg", "photos/fb-139.jpg", "photos/fb-140.jpg",
  "photos/fb-141.jpg", "photos/fb-142.jpg", "photos/fb-143.jpg", "photos/fb-144.jpg",
  "photos/fb-145.jpg", "photos/fb-146.jpg", "photos/fb-147.jpg", "photos/fb-148.jpg",
  "photos/fb-149.jpg", "photos/fb-150.jpg", "photos/fb-151.jpg", "photos/fb-152.jpg",
  "photos/fb-153.jpg", "photos/fb-154.jpg", "photos/fb-155.jpg", "photos/fb-156.jpg",
  "photos/fb-157.jpg", "photos/fb-158.jpg", "photos/fb-159.jpg", "photos/fb-160.jpg",
  "photos/fb-161.jpg", "photos/fb-162.jpg", "photos/fb-163.jpg", "photos/fb-164.jpg",
  "photos/fb-165.jpg", "photos/fb-166.jpg", "photos/fb-167.jpg", "photos/fb-168.jpg",
  "photos/fb-169.jpg", "photos/fb-170.jpg", "photos/fb-171.jpg", "photos/fb-172.jpg",
  "photos/fb-173.jpg", "photos/fb-174.jpg", "photos/fb-175.jpg", "photos/fb-176.jpg",
  "photos/fb-177.jpg", "photos/fb-178.jpg", "photos/fb-179.jpg", "photos/fb-180.jpg",
  "photos/fb-181.jpg", "photos/fb-182.jpg", "photos/fb-183.jpg", "photos/fb-184.jpg",
  "photos/fb-185.jpg", "photos/fb-186.jpg", "photos/fb-187.jpg", "photos/fb-188.jpg",
  "photos/fb-189.jpg", "photos/fb-190.jpg", "photos/fb-191.jpg", "photos/fb-192.jpg",
  "photos/fb-193.jpg", "photos/fb-194.jpg", "photos/fb-195.jpg", "photos/fb-196.jpg",
  "photos/fb-197.jpg", "photos/fb-198.jpg", "photos/fb-199.jpg", "photos/fb-200.jpg",
  "photos/fb-201.jpg", "photos/fb-202.jpg", "photos/fb-203.jpg", "photos/fb-204.jpg",
  "photos/fb-205.jpg", "photos/fb-206.jpg", "photos/fb-207.jpg", "photos/fb-208.jpg",
  "photos/fb-209.jpg",
];

/* 페이스북 사진첩 주소 (사진첩 코너에 '페이스북에서 더 보기' 단추로 연결됩니다) */
const FACEBOOK_URL = "https://www.facebook.com/churchpeace";
