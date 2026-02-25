// node_addon/test.js
const neonMath = require('./build/Release/neon_math');

// สร้าง Float32Array 2 ชุด (เพื่อให้ตรงกับโครงสร้าง Memory ที่ Assembly รอรับอยู่)
const a = new Float32Array([1.5, 2.0, 3.5, 4.0]);
const b = new Float32Array([2.0, 3.0, 2.0, 2.5]);

console.log("🚀 กำลังส่ง Array จาก JavaScript ทะลุลงไปให้ชิป M1...");

// วินาทีประวัติศาสตร์: เรียกฟังก์ชัน Assembly ผ่าน JS!
const result = neonMath.multiply(a, b);

console.log("✅ ผลลัพธ์ที่คำนวณด้วยชุดคำสั่ง NEON SIMD:");
console.log(result);