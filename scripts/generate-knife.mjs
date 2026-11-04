// Generates public/knife.svg: line drawings of the Fairbairn-Sykes commando knife, used as a texture.
import fs from "node:fs";

const W = 1600;
const H = 1000;

const f = (n) => n.toFixed(1);

/**
 * One knife, drawn pointing along +x in a local frame of 300 units (tip at 0, pommel at 300),
 * then scaled, rotated and moved to (cx, cy) = the centre of the knife.
 */
function knife({ cx, cy, length, rotate = 0 }) {
  const s = length / 300;
  const c = Math.cos(rotate);
  const sn = Math.sin(rotate);
  const tx = (x, y) => {
    const lx = (x - 150) * s;
    const ly = y * s;
    return `${f(cx + lx * c - ly * sn)} ${f(cy + lx * sn + ly * c)}`;
  };
  const line = (pts, close = false) => `M${pts.map(([x, y]) => tx(x, y)).join("L")}${close ? "Z" : ""}`;
  const paths = [];

  // Double-edged blade with a centre ridge, slightly concave towards the point
  const blade = [[0, 0]];
  for (let x = 12; x <= 160; x += 12) blade.push([x, -(1.2 + 7.6 * Math.pow(x / 160, 0.82))]);
  blade.push([166, -8.8], [172, -8.8], [172, 8.8], [166, 8.8]);
  for (let x = 156; x >= 12; x -= 12) blade.push([x, 1.2 + 7.6 * Math.pow(x / 160, 0.82)]);
  paths.push(line(blade, true));
  paths.push(line([[6, 0], [166, 0]]));
  // Bevel lines either side of the ridge
  paths.push(line([[10, -0.4], [160, -4.2], [166, -4.2]]));
  paths.push(line([[10, 0.4], [160, 4.2], [166, 4.2]]));
  // Ricasso
  paths.push(line([[166, -8.8], [166, 8.8]]));

  // Oval crossguard
  const guard = [];
  for (let i = 0; i <= 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    guard.push([177 + Math.cos(a) * 4.2, Math.sin(a) * 29]);
  }
  paths.push(line(guard, true));

  // Bottle-shaped ringed grip
  const half = (x) => {
    const t = (x - 182) / 104;
    return 6.5 + 6 * Math.sin(Math.PI * Math.min(1, t * 1.15)) * (t < 0.87 ? 1 : 1 - (t - 0.87) * 3);
  };
  const top = [];
  const bottom = [];
  for (let x = 182; x <= 286; x += 4) {
    top.push([x, -half(x)]);
    bottom.unshift([x, half(x)]);
  }
  paths.push(line([...top, ...bottom], true));
  for (let x = 188; x <= 282; x += 4) paths.push(line([[x, -half(x)], [x, half(x)]]));

  // Pommel nut and tip
  const pommel = [];
  for (let i = 0; i <= 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    pommel.push([292 + Math.cos(a) * 6, Math.sin(a) * 7.5]);
  }
  paths.push(line(pommel, true));
  paths.push(line([[298, -2.5], [302, -2], [302, 2], [298, 2.5]]));

  return paths;
}

const paths = [
  ...knife({ cx: 1060, cy: 400, length: 1150, rotate: -0.42 }),
  ...knife({ cx: 260, cy: 760, length: 620, rotate: 0.62 }),
  ...knife({ cx: 820, cy: 830, length: 300, rotate: -1.1 }),
];

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="#000" stroke-width="1.1" stroke-linejoin="round">${paths
  .map((d) => `<path d="${d}"/>`)
  .join("")}</g></svg>`;

fs.writeFileSync(new URL("../public/knife.svg", import.meta.url), svg);
console.log(paths.length, "paths");
