import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
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
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'cjs' ? 'shared-ui.cjs' : `shared-ui.${format}.js`)
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'classnames',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        /^@digdir\/designsystemet-react(\/.*)?$/
      ],
      output: {
        // No UMD globals needed when emitting CJS/ESM only
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