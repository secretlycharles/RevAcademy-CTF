#include <cuda_runtime.h>
#include <stdio.h>
#include <stdint.h>
#include <string.h>

#define MAX_LENGTH 8
#define CHARSET_SIZE 62
#define THREADS_PER_BLOCK 256
#define TARGET_HASH 0

// Character set: 0-9, a-z, A-Z
__constant__ char charset[CHARSET_SIZE] = {
    '0','1','2','3','4','5','6','7','8','9',
    'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
    'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'
};

// Hash function matching the JavaScript implementation
__device__ uint32_t hash_string(const char* str, int len) {
    uint32_t hash = 3735928559U; // Initial value from JS code
    
    for (int i = 0; i < len; i++) {
        hash = ((hash << 5) - hash) + (uint32_t)str[i];
    }
    
    return hash;
}

// Convert thread index to string combination
__device__ void index_to_string(uint64_t index, char* str, int len) {
    for (int i = 0; i < len; i++) {
        str[len - 1 - i] = charset[index % CHARSET_SIZE];
        index /= CHARSET_SIZE;
    }
    str[len] = '\0';
}

// Calculate total combinations for given length
__host__ uint64_t calculate_combinations(int len) {
    uint64_t total = 1;
    for (int i = 0; i < len; i++) {
        total *= CHARSET_SIZE;
    }
    return total;
}

__global__ void brute_force_kernel(int string_length, uint64_t start_index, uint64_t total_combinations, int* found, char* result) {
    uint64_t idx = blockIdx.x * blockDim.x + threadIdx.x;
    uint64_t global_idx = start_index + idx;
    
    if (global_idx >= total_combinations) return;
    
    char test_string[MAX_LENGTH + 1];
    index_to_string(global_idx, test_string, string_length);
    
    uint32_t hash = hash_string(test_string, string_length);
    
    if (hash == TARGET_HASH) {
        if (atomicCAS(found, 0, 1) == 0) {
            // First thread to find the solution
            for (int i = 0; i <= string_length; i++) {
                result[i] = test_string[i];
            }
        }
    }
}

void brute_force_length(int len) {
    printf("Searching strings of length %d...\n", len);
    
    uint64_t total_combinations = calculate_combinations(len);
    printf("Total combinations: %llu\n", total_combinations);
    
    int* d_found;
    char* d_result;
    int h_found = 0;
    char h_result[MAX_LENGTH + 1] = {0};
    
    cudaMalloc(&d_found, sizeof(int));
    cudaMalloc(&d_result, MAX_LENGTH + 1);
    cudaMemcpy(d_found, &h_found, sizeof(int), cudaMemcpyHostToDevice);
    
    uint64_t batch_size = 1000000000ULL; // Process in batches to avoid timeout
    
    for (uint64_t start = 0; start < total_combinations; start += batch_size) {
        uint64_t end = min(start + batch_size, total_combinations);
        uint64_t current_batch_size = end - start;
        
        int blocks = (current_batch_size + THREADS_PER_BLOCK - 1) / THREADS_PER_BLOCK;
        
        brute_force_kernel<<<blocks, THREADS_PER_BLOCK>>>(len, start, total_combinations, d_found, d_result);
        cudaDeviceSynchronize();
        
        // Check if found
        cudaMemcpy(&h_found, d_found, sizeof(int), cudaMemcpyDeviceToHost);
        if (h_found) {
            cudaMemcpy(h_result, d_result, MAX_LENGTH + 1, cudaMemcpyDeviceToHost);
            printf("\n=== SUCCESS! ===\n");
            printf("Found input that hashes to 0: '%s'\n", h_result);
            
            // Verify on host
            uint32_t verify_hash = 3735928559U;
            for (int i = 0; i < len; i++) {
                verify_hash = ((verify_hash << 5) - verify_hash) + (uint32_t)h_result[i];
            }
            printf("Verification hash: %u\n", verify_hash);
            printf("=== SUCCESS! ===\n\n");
            
            cudaFree(d_found);
            cudaFree(d_result);
            
            printf("Press Enter to exit...");
            getchar();
            return;
        }
        
        printf("Processed %llu/%llu combinations...\n", end, total_combinations);
    }
    
    printf("No solution found for length %d\n", len);
    cudaFree(d_found);
    cudaFree(d_result);
}

int main() {
    printf("CUDA Hash Brute Force - Target: %u\n", TARGET_HASH);
    printf("Using character set: %s\n", "0-9, a-z, A-Z");
    
    // Check CUDA device
    int deviceCount;
    cudaGetDeviceCount(&deviceCount);
    if (deviceCount == 0) {
        printf("No CUDA devices found!\n");
        return 1;
    }
    
    cudaDeviceProp prop;
    cudaGetDeviceProperties(&prop, 0);
    printf("Using device: %s\n", prop.name);
    
    // Test the hash function with known input
    printf("\nTesting with '324e2':\n");
    uint32_t test_hash = 3735928559U;
    const char* test_str = "324e2";
    for (int i = 0; i < 5; i++) {
        test_hash = ((test_hash << 5) - test_hash) + (uint32_t)test_str[i];
    }
    printf("Hash of '324e2': %u\n", test_hash);
    
    // Start brute force search
    printf("\nStarting brute force search...\n");
    
    for (int len = 1; len <= MAX_LENGTH; len++) {
        brute_force_length(len);
    }
    
    printf("\nSearch completed. No solution found within length %d.\n", MAX_LENGTH);
    printf("Press Enter to exit...");
    getchar();
    
    return 0;
}

// Compilation command:
// nvcc -o hash_bruteforce hash_bruteforce.cu -arch=sm_60