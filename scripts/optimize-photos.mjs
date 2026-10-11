import sharp from 'sharp';
import { mkdir, stat } from 'node:fs/promises';
const inputDirectory = process.argv[2] ?? `${process.env.HOME}/Downloads`;
const photos = [
 ['Volvo EC 25(1).jpg', 'equipment/volvo-ec25/thumb'],
 ['Messersi M-18BE.jpg', 'equipment/messersi-m18be/thumb'],
 ['XCMG XE-35U(1).jpg', 'equipment/xcmg-xe35u/thumb'],
 ['XCMG XE-35U(2).jpg', 'equipment/xcmg-xe35u/work'],
 ['Volvo EC 25(2).jpg', 'services/demolition-1'],
 ['Volvo EC 25(3).jpg', 'services/demolition-2'],
];
let inputBytes = 0, outputBytes = 0;
for (const [name, destination] of photos) {
 const input = `${inputDirectory}/${name}`;
 const output = `public/images/${destination}.webp`;
 await mkdir(output.slice(0, output.lastIndexOf('/')), { recursive: true });
 await sharp(input).rotate().resize({ width: 960, height: 1280, fit: 'inside', withoutEnlargement: true }).webp({ quality: 70, effort: 6 }).toFile(output);
 inputBytes += (await stat(input)).size;
 outputBytes += (await stat(output)).size;
 if (destination.endsWith('/thumb')) {
  await sharp(input).rotate().resize({ width: 640, height: 853, fit: 'inside', withoutEnlargement: true }).webp({ quality: 76, effort: 6 }).toFile(`public/images/${destination}-640.webp`);
  await sharp(input).rotate().resize(1200,630,{fit:'cover'}).webp({quality:78}).toFile(`public/images/${destination.replace('/thumb','/og')}.webp`);
 }
}
console.log(JSON.stringify({ inputBytes, outputBytes, reduction: `${Math.round((1-outputBytes/inputBytes)*100)}%` }));
