{
  "targets": [
    {
      "target_name": "neon_math",
      "sources": [
        "neon_bridge.cc",
        "../core_asm/matrix_mul_neon.s"
      ],
      "xcode_settings": {
        "OTHER_LDFLAGS": [
          "-Wl,-bind_at_load"
        ]
      }
    }
  ]
}