import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      rollupTypes: true,
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.tsx']
    })
  ],
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'FellesDatakatalogUI',
      formats: ['es', 'umd'],
      fileName: (format) => `shared-ui.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'classnames', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'classnames': 'classNames',
          'react/jsx-runtime': 'jsxRuntime',
          'react/jsx-dev-runtime': 'jsxDevRuntime'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'styles.css';
          }
          return assetInfo.name || 'asset';
        }
      }
    },
    sourcemap: true,
    minify: 'terser'
  }
});