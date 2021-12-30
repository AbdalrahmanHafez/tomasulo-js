class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";
  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    this.displayName = "ceec";
    return Math.hypot(dx, dy);
  }
}
class C {
  constructor() {
    console.log("c constructor");
  }
  readValue() {
    console.log(Point.displayName);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName; // undefined
p1.distance; // undefined
p2.displayName; // undefined
p2.distance; // undefined

console.log(Point.distance(p1, p2)); // 7.0710678118654755
console.log(Point.displayName); // "Point"
new C().readValue(); // "ceec"
