import { AntiTamper } from '$/tamper/mod.ts'
import consola from 'npm:consola@3.4.0'

consola.level = 0

async function boot() {
  consola.info('Booting Terra Tamper v1.0')

  const path = await consola.prompt('Enter path to .js file:', {
    type: 'text',
  })

  const fileStat = await Deno.stat(path)
  if (!fileStat || !fileStat.isFile) {
    return consola.error(`File ${path} does not exist`)
  }

  const text = await Deno.readTextFile(path)
  const antiTamper = new AntiTamper(text)

  antiTamper.tamper()
}

boot()
