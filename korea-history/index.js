const contents = `카이로 선언 -(1943. 11. 27.)
포츠담 선언 -(1945. 2.)
광복 (1945. 8. 15.)
조선 건국 준비 위원회 조직 -(1945. 8. 15.)
제 1차 미·소 공동 위원회 -(1946. 1. 16.)
정읍 발언 -(1946. 6. 3.)
좌우 합작 위원회 -(1946. 10.)
트루먼 독트린 -(1947. 3.)
제 2차 미·소 공동 위원회 -(1947. 5. 21.)
인구 비례에 의한 총선거 의결 -(1947. 11.)
남북 협상 -(1948. 4.)
제주 4·3 사건 (1948. 4. 3.)
남한 총선거 (1948. 5. 10.)
대한민국 헌법 제정 (1948. 7. 17.)
대한민국 정부 수립 (1948. 8. 15.)
반민 특위 구성 -(1948. 10.)
여수·순천 10·19 사건 (1948. 10. 19.)
경찰의 반민 특위습격 사건 -(1949. 6. 6.)
반민 특위 해체 -(1949. 10.)
귀속 재산 처리법 제정 -(1949. 12. 19.)
경자유전 원칙의 농지 개혁 (1950.)
소련의 북한 남침 계획 승인 -(1950. 5.)
6·25 전쟁 (1950. 6. 25.)
북한군의 서울 점령과 낙동강 진출 -(1950. 6. 25.)
작전 지휘권 이양 -(1950. 7. 14.)
낙동강 방어선 구축 -(1950. 8. 1.)
인천 상륙 작전 -(1950. 9. 15.)
서울 수복 -(1950. 9. 28.)
38도선 돌파(국군의 날) (1950. 10. 1.)
중국의 북한 지원 -(1950. 10. 19.)
흥남 철수 작전 -(1950. 12.)
1·4 후퇴 -(1951. 1. 4.)
서울 재탈환 -(1951. 3. 16.)
발췌 개헌 (1952.)
이승만의 반공 포로 석방 (1953. 6. 18.)
정전 협정 체결 -(1953. 7. 27.)
사사오입 개헌 (1954.)
3·15 부정선거 (1960. 3. 15.)
4·19 혁명 (1960. 4. 19.)`;
const contentList = contents.split("\n");
const getDate = (content) => {
    return content.match(/\((\d+\.(?: \d+\.)?(?: \d+\.)?)\)/);
};
const isImportant = (content) => {
    return /-\(\d+\.(?: \d+\.)?(?: \d+\.)?\)/.test(content);
};
let buffer = "";
let sortedContentList = [];
contentList.sort((a, b) => {
    const matchesA = getDate(a);
    const matchesB = getDate(b);
    if (matchesA === null)
        return 1;
    if (matchesB === null)
        return 1;
    const dateA = new Date(matchesA[1]);
    const dateB = new Date(matchesB[1]);
    return (dateA.getFullYear() < dateB.getFullYear() &&
        dateA.getMonth() < dateB.getMonth() &&
        dateA.getDate() < dateB.getDate()) ? -1 : 1;
});
console.log(contentList.map(content => {
    const matches = getDate(content);
    if (matches === null)
        return content;
    const date = matches[1];
    return `<li>${content.replace(/(-)?(\((\d+\.(?: \d+\.)?(?: \d+\.)?)\))/, (_, important, group) => {
        return `<span${important === undefined ? ' class="important"' : ""}>${group}</span>`;
    })}</li>`;
}).join("\n"));
