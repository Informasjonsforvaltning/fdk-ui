import { existsSync, readFileSync } from 'node:fs';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const { dependencies = {}, peerDependencies = {} } = JSON.parse(readFileSync('./package.json', 'utf8')) as {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};
const externalPackages = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];

const useClientPattern = /^\s*(?:\/\/[^\n]*\n\s*|\/\*[\s\S]*?\*\/\s*)*['"]use client['"]/;

/** Whether a source module starts with a 'use client' directive (comments before it are allowed). */
const isClientModule = (moduleId: string | null) => {
  if (!moduleId || !/\.(t|j)sx?$/.test(moduleId) || moduleId.includes('node_modules')) return false;
  // Virtual modules (e.g. the bundler runtime) have ids that are not files on disk.
  if (moduleId.startsWith('\0') || !existsSync(moduleId)) return false;
  return useClientPattern.test(readFileSync(moduleId, 'utf8'));
};

/**
 * Rolldown drops module-level directives, so this adds 'use client' back to the output of each
 * module that declares it. It runs after minification, which would otherwise strip it again.
 * Requires `preserveModules`: a directive only applies to a whole output file.
 */
const preserveUseClient = (): Plugin => ({
  name: 'preserve-use-client',
  apply: 'build',
  generateBundle(_options, bundle) {
    for (const output of Object.values(bundle)) {
      if (output.type !== 'chunk' || !isClientModule(output.facadeModuleId)) continue;

      output.code = `'use client';\n${output.code}`;

      // Shift the sourcemap down by the line added above.
      const sourcemap = bundle[`${output.fileName}.map`];
      if (sourcemap?.type === 'asset' && typeof sourcemap.source === 'string') {
        const map: { mappings: string } = JSON.parse(sourcemap.source);
        map.mappings = `;${map.mappings}`;
        sourcemap.source = JSON.stringify(map);
      }
    }
  },
});

/**
 * Source imports react-syntax-highlighter's ESM styles. The CommonJS build must require its
 * CommonJS copy, or require() fails in CommonJS environments such as Jest. (Same length, so
 * sourcemaps are unaffected.)
 */
const syntaxHighlighterCjsStyles = (): Plugin => ({
  name: 'syntax-highlighter-cjs-styles',
  apply: 'build',
  generateBundle(options, bundle) {
    if (options.format !== 'cjs') return;
    for (const output of Object.values(bundle)) {
      if (output.type !== 'chunk') continue;
      output.code = output.code.replaceAll('react-syntax-highlighter/dist/esm/', 'react-syntax-highlighter/dist/cjs/');
    }
  },
});

export default defineConfig({
  plugins: [
    react(),
    preserveUseClient(),
    syntaxHighlighterCjsStyles()
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
      fileName: (format, entryName) => {
        const extension = format === 'cjs' ? 'cjs' : 'js';
        // Keep the published entry points stable; other modules go in a folder per format.
        if (entryName === 'index') return format === 'cjs' ? 'shared-ui.cjs' : 'shared-ui.es.js';
        return `${format}/${entryName}.${extension}`;
      }
    },
    rolldownOptions: {
      // Dependencies are installed alongside the library, so keep them (and their subpaths) as
      // imports instead of copying their code into dist.
      external: (id) => externalPackages.some((name) => id === name || id.startsWith(`${name}/`)),
      output: {
        // One output file per source module, so module-level directives such as 'use client'
        // survive the build. Bundling everything into one file would drop them, and components
        // with state could then not be rendered from React Server Components.
        preserveModules: true,
        preserveModulesRoot: 'src',
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