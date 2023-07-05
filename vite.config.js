import {defineConfig} from 'vite'
import glob from 'glob';

let files = new Map(
  glob.sync('components/**/*.scss').map(file => [
    file, file
  ])
);
files.set('main', '/assets/js/main.js');

export default defineConfig({
  build: {
    manifest: true,
    rollupOptions: {
      input: Object.fromEntries(files),
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `chunks/[name].js`,
        assetFileNames: (assetInfo) => {
          let name = assetInfo.name.split('.').at(0);
          let fileLoc = ""
          if (name != 'main') {
            fileLoc = `components/${name}/`
          }
          return `${fileLoc}[name][extname]`;
        },
      }
    }
  }
})