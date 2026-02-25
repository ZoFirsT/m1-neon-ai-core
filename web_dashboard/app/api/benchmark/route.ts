import { NextResponse } from 'next/server';
import path from 'path';

export async function POST() {
  try {
    // 1. โหลด Native Module ของเรา (ใช้เส้นทางสัมพัทธ์อ้างอิงจากโฟลเดอร์ web_dashboard)
    // ใช้ eval('require') เพื่อป้องกันไม่ให้ Webpack ของ Next.js พยายามอ่านไฟล์ .node ตอน Build
    const addonPath = path.resolve(process.cwd(), '../node_addon/build/Release/neon_math.node');
    const requireNative = eval('require'); 
    const neonMath = requireNative(addonPath);

    // 2. สร้าง Array ขนาดใหญ่ 10 ล้านตัว (Float32Array) เพื่อให้เห็นความต่างชัดเจน
    const SIZE = 10000000;
    const a = new Float32Array(SIZE).fill(1.5);
    const b = new Float32Array(SIZE).fill(2.5);

    // --- ทดสอบที่ 1: JavaScript (V8 Engine) ---
    const startJS = performance.now();
    const resultJS = new Float32Array(SIZE);
    for (let i = 0; i < SIZE; i++) {
      resultJS[i] = a[i] * b[i];
    }
    const endJS = performance.now();
    const timeJS = endJS - startJS;

    // --- ทดสอบที่ 2: ARM64 Assembly (M1 NEON) ---
    const startASM = performance.now();
    const resultASM = neonMath.multiply(a, b);
    const endASM = performance.now();
    const timeASM = endASM - startASM;

    // 3. คำนวณว่า Assembly เร็วกว่ากี่เท่า
    const speedup = timeASM > 0 ? (timeJS / timeASM).toFixed(2) : "MAX";

    return NextResponse.json({
      success: true,
      size: SIZE,
      timeJS: Number(timeJS.toFixed(2)),
      timeASM: Number(timeASM.toFixed(2)),
      speedup: speedup
    });

  } catch (error: any) {
    console.error("Benchmark Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}