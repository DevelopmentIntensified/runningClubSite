import { defineConfig } from 'vite'
import { existsSync, mkdirSync, copyFileSync } from 'fs'
import { resolve as pathResolve, join as pathJoin } from 'path'
import { routes } from './data/routes'

function cloneIndexHtmlPlugin(routes) {
  const name = 'CloneIndexHtmlPlugin'
  const outDir = 'dist' // config's `build.outDir`
  const src = pathJoin(outDir, 'index.html')

  return {
    name,
    closeBundle: () => {
      routes.map((p) => {
        p = p.path.replace("/", "")
        const dir = pathResolve(outDir, p)
        if (!existsSync(dir)) {
          mkdirSync(dir, { recursive: true })
        }

        const dst = pathJoin(outDir, p, 'index.html')

        // It is possible to edit HTML here, too.
        copyFileSync(src, dst)
        console.log(`${name}: Copied ${src} to ${dst}`)
      })
    },
  }
}
export default defineConfig({
  plugins: [cloneIndexHtmlPlugin(routes)],
})
