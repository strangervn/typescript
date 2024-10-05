import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/server.ts', // Điểm vào của ứng dụng
  output: {
    file: 'dist/bundle.js', // Tên file đầu ra
    format: 'iife', // Hoặc 'cjs', 'es', 'umd', v.v.
    name: 'MyBundle', // Tên biến toàn cục cho IIFE
  },
  plugins: [
    typescript() // Plugin để xử lý TypeScript
  ]
};