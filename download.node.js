const download = require('download');
const fs = require('fs');

const ids = [
  'DS_PHR1A_201604111052119_FR1_PX_E001N43_0615_01712',
  'DS_PHR1A_201603301044531_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201603231048389_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201602051100204_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201601241052449_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201601171056299_FR1_PX_E001N43_0615_01768',
  'DS_PHR1A_201512171045376_FR1_PX_E001N43_0615_01768',
  'DS_PHR1A_201512031053291_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201510311057099_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201510171104376_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201509281100580_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201509161053246_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201509091057175_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201508261104571_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201506231056554_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201506041053076_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201506021108203_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201504181104116_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201504131053028_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201503111056545_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201503061045268_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201502131056503_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201411011057160_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201409171053053_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201409101057246_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201409031100531_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201408101046059_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201408011104559_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201406191045299_FR1_PX_E001N43_0615_01711',
  'DS_PHR1A_201406051053135_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201405221100463_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201405151104243_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201404141052385_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201404071056123_FR1_PX_E001N43_0615_01712',
  'DS_PHR1A_201403121056043_FR1_PX_E001N43_0615_01654',
  'DS_PHR1A_201312311053160_FR1_PX_E001N43_0615_01754',
  'DS_PHR1A_201312121049254_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201312101104326_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201311281056201_FR1_PX_E001N43_0615_01654',
  'DS_PHR1A_201310141052561_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201310071056401_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201309231104180_FR1_PX_E001N43_0615_01728',
  'DS_PHR1A_201307091049344_FR1_PX_E001N43_0615_01654'
];

const x_min = 132015; // 1.295013427734375
const x_max = 132200; // 1.550445556640625

const y_min = 95631; // 43.69270087644112
const y_max = 95813; // 43.5107129908437

const z_min = 10;
const z_max = 18;

const t_length = ids.length;
const x_length = x_max - x_min + 1; // 186
const y_length = y_max - y_min + 1; // 183
const z_length = z_max - z_min + 1;

function start(min, max, z) {
  const scale = Math.pow(2, z_max - z);
  return Math.ceil(min / scale);
}

function end(min, max, z) {
  const scale = Math.pow(2, z_max - z);
  return Math.floor(max / scale);
}

function api_link_raw(id, z, x, y) {
  return `http://sandbox.youmapps.com/tiles/${id}/${z}/${x}/${y}`;
}

function api_link(t, z, x, y) {
  if (t < 0 || t >= t_length)
    throw new Error('Invalid t');
  if (x < 0 || x >= x_length)
    throw new Error('Invalid x');
  if (y < 0 || y >= y_length)
    throw new Error('Invalid y');
  if (z < 0 || z >= z_length)
    throw new Error('Invalid z');
  
  const scale = Math.pow(2, z_max - z);
  
  return api_link_raw(ids[t], z_min + z, x_min + (x/scale)|0, y_min + (y/scale)|0);
}

const base_dir = 'tiles';

function id_dir(id) { return `${base_dir}/${id}`; }
function z_dir(id, z) { return `${base_dir}/${id}/${z}`; }
function x_dir(id, z, x) { return `${base_dir}/${id}/${z}/${x}`; }
function y_file(id, z, x, y) { return `${base_dir}/${id}/${z}/${x}/${y}`; }

function download_id(id) {
  console.log(`download id: ${id}`);
  fs.mkdir(id_dir(id), (err) => {
    if (err && err.code != 'EEXIST') {
      console.error(''+err);
      return;
    }
    for (let z = 10; z < 16; ++z)
      download_z(id, z);
});}

function download_z(id, z) {
  //console.log(`download z: ${id}/${z}`);
  fs.mkdir(z_dir(id, z), (err) => {
    if (err && err.code != 'EEXIST') {
      console.error(''+err);
      return;
    }
    for (let x = start(x_min, x_max, z), e = end(x_min, x_max, z); x <= e; ++x)
      download_x(id, z, x);
});}

function download_x(id, z, x) {
  //console.log(`download x: ${id}/${z}/${x}`);
  fs.mkdir(x_dir(id, z, x), (err) => {
    if (err && err.code != 'EEXIST') {
      console.error(''+err);
      return;
    }
    for (let y = start(y_min, y_max, z), e = end(y_min, y_max, z); y <= e; ++y)
      download_y(id, z, x, y);
});}

const queue = [];

function download_y(id, z, x, y) {
  //console.log(`download y: ${id}/${z}/${x}/${y}`);
  queue.push(function() {
    return new Promise((resolve, reject) => {
      download(api_link_raw(id, z, x, y)).pipe(fs.createWriteStream(y_file(id, z, x, y))).on('finish', () => {
        console.log(`DONE: ${id}/${z}/${x}/${y}`);
        resolve();
      });
    });
  });
}

for (const id of ids)
  download_id(id);
//download_id(ids[0]);

console.log(queue.length);

function thread() {
  if (queue.length == 0)
    return;
    
  const task = queue.pop();
  task().then(thread);
}

for (let i = 0; i < 30; ++i)
  thread();
