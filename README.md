# M1 NEON AI Core (NeonTensor-JS)

## Overview
A high-performance Matrix Multiplication library engineered specifically for Apple Silicon (M1/ARM64). This project bypasses high-level abstractions by utilizing bare-metal ARM64 Assembly and NEON SIMD (Single Instruction, Multiple Data) instructions to accelerate the core mathematical operations required for AI and machine learning workloads.

The system is designed to bridge low-level hardware execution with modern web environments, providing a Node.js/Next.js interface to execute and benchmark matrix operations in real-time.

## Architecture
The project architecture is divided into three primary layers:
1.  **Core Execution (ARM64 Assembly):** Direct manipulation of CPU registers (`v0` - `v31`) to maximize throughput and minimize latency for matrix calculations.
2.  **Integration Bridge (C++ / Node-API):** A native module layer that safely wraps the assembly routines, exposing them to the V8 JavaScript engine without significant overhead.
3.  **Visualization Dashboard (Next.js):** A frontend interface for triggering computational workloads and rendering real-time performance comparisons (e.g., V8 Math vs. C++ vs. Pure Assembly).

## Technical Stack
* **Low-Level Mathematics:** ARM64 Assembly (AArch64), NEON SIMD
* **Native Bindings:** C++, Node-API (N-API), node-gyp
* **Frontend Interface:** Next.js, React, Tailwind CSS
* **Build Tools:** Apple LLVM (clang), Make

## Repository Structure
* `/core_asm` - Contains raw ARM64 Assembly source files and compilation scripts.
* `/node_addon` - Contains the C++ wrapper and `.gyp` configuration for Node.js integration.
* `/web_dashboard` - Contains the Next.js application for performance monitoring and benchmarking.

## Prerequisites
* Apple Silicon Mac (M1/M2/M3)
* Xcode Command Line Tools (`xcode-select --install`)
* Node.js (v18.x or higher) and npm/yarn
* Basic understanding of C++ build pipelines

---
*Developed by Thanatcha Saleekongchai (ZoFirsT)*