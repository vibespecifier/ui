import react from "@vitejs/plugin-react"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import dts from "unplugin-dts/vite"
import { defineConfig, Plugin } from "vite"

/**
 * Compile package.json from a development environment to an output package.
 *
 * 1. Remove fields for dev like `devDependencies`, `scripts`.
 * 2. Override specified files into the manifest configurations.
 * 3. Compress the package.json file, avoid unnecessary indent.
 *
 * @param options how to compile package.json.
 * @returns a vite plugin.
 */
function manifest(options?: {
  source?: string
  overrides?: Record<string, unknown>
}): Plugin {
  const source = options?.source || join(import.meta.dirname, "package.json")
  let outdir: string

  return {
    name: "manifest",
    configResolved(config) {
      outdir = config.build.outDir
    },
    closeBundle(error) {
      if (error) throw error
      const manifest = JSON.parse(readFileSync(source).toString())
      manifest.engines = undefined
      manifest.packageManager = undefined
      manifest.scripts = undefined
      manifest.devDependencies = undefined
      for (const key of Object.keys(options?.overrides ?? {})) {
        manifest[key] = options?.overrides?.[key]
      }
      writeFileSync(join(outdir, "package.json"), JSON.stringify(manifest))
    },
  }
}

const root = import.meta.dirname
const outdir = join(root, "out")
const filename = "index"

export default defineConfig({
  plugins: [
    react(),
    dts({ bundleTypes: true }),
    manifest({
      source: join(root, "package.json"),
      overrides: {
        exports: {
          ".": { import: `./${filename}.js`, require: `./${filename}.umd.cjs` },
          [`./${filename}.css`]: `./${filename}.css`,
        },
      },
    }),
  ],
  resolve: {
    alias: { "@": join(root, "src") },
    external: ["react", "react-dom"],
  },
  build: {
    outDir: outdir,
    emptyOutDir: true,
    lib: { entry: "src/index.ts", name: "VibeSpecifierUI", fileName: filename },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: { globals: { react: "React", "react-dom": "ReactDOM" } },
    },
  },
})
