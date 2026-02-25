// core_asm/main.c
#include <stdio.h>

// ประกาศเรียกใช้ฟังก์ชันจากไฟล์ Assembly
extern void multiply_arrays_neon(float* A, float* B, float* Result, int length);

int main() {
    // กำหนด Array ขนาด 4 ตัว (เพื่อให้พอดีกับการประมวลผล SIMD 1 รอบ)
    float A[4] = {1.5, 2.0, 3.5, 4.0};
    float B[4] = {2.0, 3.0, 2.0, 2.5};
    float Result[4] = {0};

    // เรียกใช้งาน Assembly ข้ามภาษา!
    multiply_arrays_neon(A, B, Result, 4);

    // แสดงผลลัพธ์
    printf("ผลลัพธ์จากการคำนวณด้วยชิป M1 NEON:\n");
    for(int i = 0; i < 4; i++) {
        printf("%.2f x %.2f = %.2f\n", A[i], B[i], Result[i]);
    }

    return 0;
}