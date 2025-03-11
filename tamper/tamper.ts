import consola from 'npm:consola@3.4.0'
import { parse } from 'npm:@swc/core@1.11.8'
import { Analyzer, Transformer } from '$/tamper/mod.ts'

export class AntiTamper {
  constructor(private readonly code: string) {}

  async tamper() {
    const parsed = await parse(this.code)

    const analyzer = new Analyzer(parsed)
    await analyzer.analyze()

    const transformer = new Transformer(analyzer)

    const transformed = await transformer.transform()

    await Deno.writeTextFile('out.js', transformed.code)

    consola.success('Transformed!')
  }
}
