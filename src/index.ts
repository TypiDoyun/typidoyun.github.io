import { Vec2 } from "vecs-ts";
import { Mouse } from "./classes/mouse";

const move = (where: number, behavior: ScrollBehavior = "smooth") => {
    const firstItem = document.getElementsByClassName("item")[0] as HTMLDivElement;
    const element = document.getElementById(`section${where}`);

    if (!element) return;

    window.scrollTo({
        top: firstItem.clientHeight * (where - 1),
        behavior
    });
}

const setScreenHeight = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setScreenHeight();
addEventListener("resize", setScreenHeight);

const main = () => {
    Mouse.initialize();

    const items = Array.from(document.getElementsByClassName("item")) as HTMLDivElement[];
    const sections = Array.from(document.getElementsByClassName("section")) as HTMLDivElement[];
    const buttons = Array.from(document.getElementsByClassName("button-content")) as HTMLDivElement[];

    const iframe = document.getElementById("background") as HTMLIFrameElement;

    const resize = () => {
        iframe.width = window.innerWidth.toString();
        iframe.height = (window.innerHeight * 1.2).toString();
    }

    resize();

    // 창 크기를 줄여 스크롤 UI로 넘어가면 가장 위로 이동
    // 창 크기를 조절하면 iframe 크기도 창 크기에 맞게 조절
    addEventListener("resize", () => {
        move(1, "instant");
        resize();
    });

    for (const button of buttons) {
        const where = Array.from(button.classList).find(className => className.startsWith("to-"))
            ?.replace(/to\-(\d+)/g, "$1");
        if (!where) continue;

        button.addEventListener("click", () => {
            move(+where);
        });
    }

    for (let index = 0; index < sections.length; index++) {
        const item = items[index];
        const section = sections[index];

        let tick = 0;
        setInterval(() => {
            if (tick > 0) tick--;
        }, 10);

        const distanceLimit = 60;

        let interval: NodeJS.Timeout;
        section.addEventListener("mouseenter", () => {
            if (tick > 0) return;
            if (window.innerWidth < 1024) return;

            item.style.position = "relative";
            section.style.position = "absolute";
            section.style.transition = "transform 0.5s";
            section.style.left = "0";
            section.style.top = "0";

            interval = setInterval(() => {
                const absoluteCenter = new Vec2(
                    item.offsetLeft + section.clientWidth / 2,
                    item.offsetTop + section.clientHeight / 2
                );
                const center = new Vec2(
                    absoluteCenter.x + section.offsetLeft,
                    absoluteCenter.y + section.offsetTop
                );
                const direction = Vec2.sub(Mouse, absoluteCenter);
                const distance = Math.hypot(direction.x, direction.y);
                const destination = new Vec2(
                    distance > distanceLimit ? direction.x * (distanceLimit / distance) : direction.x,
                    distance > distanceLimit ? direction.y * (distanceLimit / distance) : direction.y
                );
                
                const destDirection = Vec2.add(Vec2.sub(destination, center), absoluteCenter);
                
                section.style.left = `${+section.style.left.replace("px", "") + (destDirection.x / 100)}px`;
                section.style.top = `${+section.style.top.replace("px", "") + (destDirection.y / 50)}px`;
                
            }, 10);
        });

        section.addEventListener("mouseleave", () => {
            section.style.position = "relative";
            section.style.transition = ".5s";
            section.style.left = "0";
            section.style.top = "0";
            
            tick = 1;
            
            clearInterval(interval);
        });
    }
}

addEventListener("DOMContentLoaded", main);
// const main = () => {
//     const items = Array.from(document.getElementsByClassName("item")) as HTMLDivElement[];
//     const sections = Array.from(document.getElementsByClassName("section")) as HTMLDivElement[];
//     const item = items[0];
    
//     const mousePosition = {
//         x: 0,
//         y: 0
//     }
    
//     const getMousePosition = (eventData: MouseEvent) => {
//         mousePosition.x = eventData.clientX;
//         mousePosition.y = eventData.clientY;
//     }
    
//     addEventListener("mousemove", getMousePosition);
    
//     const move = (where: 1 | 2 | 3, behavior: ScrollBehavior = "smooth") => {
//         const element = document.getElementById(`section${where}`);
        
//         if (!element) return;
        
//         window.scrollTo({
//             top: item.clientHeight * (where - 1),
//             behavior
//         });
//     }
    
//     addEventListener("resize", () => {
//         move(1, "instant");
//     });
    
//     const distanceLimit = 60;
    
//     for (let index = 0; index < sections.length; index++) {
        
//         const item = items[index];
//         const section = sections[index];
        
//         let tick = 0;
        
//         setInterval(() => {
//             if (tick > 0) tick--;
//         }, 10);
        
//         let interval: number;
        
//         section.addEventListener("mouseenter", () => {
//             if (tick > 0) return;
//             if (window.innerWidth < 1024) return;
            
//             item.style.position = "relative";
//             section.style.position = "absolute";
//             section.style.transition = "transform 0.5s";
//             section.style.left = "0";
//             section.style.top = "0";
            
//             interval = setInterval(() => {
//                 const absoluteCenter = {
//                     x: item.offsetLeft + section.clientWidth / 2,
//                     y: item.offsetTop + section.clientHeight / 2
//                 }
//                 const center = {
//                     x: absoluteCenter.x + section.offsetLeft,
//                     y: absoluteCenter.y + section.offsetTop
//                 };
//                 const direction = {
//                     x: mousePosition.x - absoluteCenter.x,
//                     y: mousePosition.y - absoluteCenter.y
//                 }
//                 const distance = (direction.x ** 2 + direction.y ** 2) ** 0.5;
//                 const destination = {
//                     x: distance > distanceLimit ? direction.x * (distanceLimit / distance) : direction.x,
//                     y: distance > distanceLimit ? direction.y * (distanceLimit / distance) : direction.y
//                 }
                
//                 const destDirection = {
//                     x: destination.x - (center.x - absoluteCenter.x),
//                     y: destination.y - (center.y - absoluteCenter.y),
//                 }
                
//                 section.style.left = `${+section.style.left.replace("px", "") + (destDirection.x / 100)}px`;
//                 section.style.top = `${+section.style.top.replace("px", "") + (destDirection.y / 50)}px`;
                
//             }, 10);
//         });
        
//         section.addEventListener("mouseleave", () => {
//             section.style.position = "relative";
//             section.style.transition = ".5s";
//             section.style.left = "0";
//             section.style.top = "0";
            
//             tick = 1;
            
//             clearInterval(interval);
//         });
//     }
// }

// addEventListener("DOMContentLoaded", main);
