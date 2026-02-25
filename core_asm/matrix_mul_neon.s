.global _multiply_arrays_neon
.align 2

// ฟังก์ชัน: void multiply_arrays_neon(float* A [x0], float* B [x1], float* Result [x2], int length [w3])
_multiply_arrays_neon:
    // ตรวจสอบว่า length > 0 หรือไม่ ถ้าไม่ให้ข้ามไปที่ .end
    cmp w3, #0
    ble .end

    // หาร length ด้วย 4 (เพราะ NEON ประมวลผล float32 ทีละ 4 ตัว = 128 bit)
    // เก็บจำนวนรอบของการวนลูปไว้ที่ Register w4
    lsr w4, w3, #2

.loop:
    // โหลดข้อมูล 4 ตัวจาก Array A และ B เข้าไปใน Vector Register (v0 และ v1)
    // การใส่ #16 คือสั่งให้ Pointer ขยับไปข้างหน้า 16 bytes (4 bytes * 4 ตัว) อัตโนมัติ
    ld1 {v0.4s}, [x0], #16  
    ld1 {v1.4s}, [x1], #16  

    // ทะลวงขีดจำกัดความเร็ว: คูณตัวเลขทั้ง 4 คู่พร้อมกันในคำสั่งเดียว! (v2 = v0 * v1)
    fmul v2.4s, v0.4s, v1.4s

    // นำผลลัพธ์ 4 ตัวใน v2 ไปเขียนลง Array Result และขยับ Pointer
    st1 {v2.4s}, [x2], #16

    // ลดจำนวนรอบลูปลง 1 และวนกลับไปถ้ายังไม่ถึง 0
    subs w4, w4, #1
    bne .loop

.end:
    // จบการทำงานและคืนค่ากลับให้โปรแกรมหลัก
    ret