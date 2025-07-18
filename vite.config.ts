import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    })
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SharedUI',
      formats: ['es', 'umd'],
      fileName: (format) => `shared-ui.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});