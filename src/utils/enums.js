
const stacks = {
    JAVASCRIPT:"JavaScript",
    TYPESCRIPT:"TypeScript",
    REACT:"React",
    VUE:"Vue",
    SVELTE:"Svelte",
    NEXTJS:"Nextjs",
    NODEJS:"Nodejs",
    JAVA:"Java",
    SPRING:"Spring",
    GO:"Go",
    NESTJS:"Nestjs",
    KOTLIN:"Kotlin",
    MYSQL:"MySQL",
    PHP:"php",
    EXPRESS:"Express",
    FIREBASE:"Firebase",
    PYTHON:"Python",
    DJANGO:"Django",
    GIT:"Git",
    AWS:"AWS",
    DOCKER:"Docker"
}

const period = {
    1:"1개월 미만",
    2: "1개월",
    3: "2개월",
    4: "3개월",
    5: "4개월",
    6: "5개월",
    7: "6개월",
    8: "6개월 이상"
}

const capacity = {
    1:1,
    2:2,
    3:3,
    4:4,
    5:5,
    6:6,
    7:7,
    8:8,
    9:9,
    10:10
}

export const Capacity = Object.freeze(capacity)
export const Period = Object.freeze(period)
export const Stacks = Object.freeze(stacks);