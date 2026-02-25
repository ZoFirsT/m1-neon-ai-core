// node_addon/neon_bridge.cc
#include <node_api.h>

// ประกาศเรียกใช้ฟังก์ชัน Assembly ของเรา (ต้องใช้ extern "C" เพื่อไม่ให้ C++ เปลี่ยนชื่อฟังก์ชันตอนคอมไพล์)
extern "C" void multiply_arrays_neon(float* A, float* B, float* Result, int length);
// ฟังก์ชันที่จะถูกเรียกจาก JavaScript
napi_value MultiplyBridge(napi_env env, napi_callback_info info) {
    size_t argc = 2;
    napi_value args[2];
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // ดึงข้อมูล Pointer และความยาวจาก Float32Array ของฝั่ง JS
    napi_typedarray_type type1, type2;
    size_t length;
    void *data1, *data2;
    napi_value arraybuffer1, arraybuffer2;
    size_t byte_offset;

    napi_get_typedarray_info(env, args[0], &type1, &length, &data1, &arraybuffer1, &byte_offset);
    napi_get_typedarray_info(env, args[1], &type2, &length, &data2, &arraybuffer2, &byte_offset);

    // จองพื้นที่หน่วยความจำสำหรับผลลัพธ์ (สร้าง ArrayBuffer ใหม่)
    napi_value result_arraybuffer;
    void* result_data;
    napi_create_arraybuffer(env, length * sizeof(float), &result_data, &result_arraybuffer);

    // สร้าง Float32Array หุ้ม ArrayBuffer นั้น
    napi_value result_typedarray;
    napi_create_typedarray(env, napi_float32_array, length, result_arraybuffer, 0, &result_typedarray);

    // --- วินาทีสำคัญ: โยน Memory Pointer ให้ Assembly ของ M1 ประมวลผล! ---
    multiply_arrays_neon((float*)data1, (float*)data2, (float*)result_data, length);

    // ส่งผลลัพธ์กลับไปให้ JavaScript
    return result_typedarray;
}

// ลงทะเบียน Module แจ้ง Node.js ว่ามีฟังก์ชันชื่อ "multiply"
napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;
    napi_create_function(env, nullptr, 0, MultiplyBridge, nullptr, &fn);
    napi_set_named_property(env, exports, "multiply", fn);
    return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)