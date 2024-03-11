const h = 3;
const p = {
    x: 0,
    y: 2
};
const q = {
    x: 2,
    y: 0
};
const findRoot = (a, b, c) => {
    return (-b + Math.sqrt(b ** 2 - 4 * a * c)) / (2 * a);
};
const a = p.y - q.y;
const b = -2 * (q.x * (p.y - h) - p.x * (q.y - h));
const c2 = (p.y - h) * (q.x ** 2) - (q.y - h) * (p.x ** 2);
console.log(findRoot(a, b, c2), Math.sqrt(3) - 1);
