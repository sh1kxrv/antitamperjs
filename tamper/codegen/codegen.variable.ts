import { UNKNOWN_SPAN } from '$/utils/mod.ts'
import type {
  Expression,
  Identifier,
  ObjectExpression,
  StringLiteral,
  VariableDeclaration,
  VariableDeclarator,
} from '../../types/swc/index.ts'

type WrappedVariableDeclaration = {
  variable: VariableDeclaration
  name: string
  appendKeyValueProperty: (key: string, value: string) => void
}

export class CodegenVariable {
  createVariable(
    name: string,
    kind: VariableDeclaration['kind'],
  ): WrappedVariableDeclaration {
    const declarations = [] as VariableDeclarator[]

    const appendRootDeclarator = (init: Expression) => {
      const id = {
        optional: false,
        type: 'Identifier',
        span: UNKNOWN_SPAN,
        ctxt: 2,
        value: name,
      } as Identifier
      declarations.push({
        type: 'VariableDeclarator',
        span: UNKNOWN_SPAN,
        id,
        init,
        definite: false,
      })
    }

    const properties: ObjectExpression['properties'] = []

    const init = {
      properties,
      type: 'ObjectExpression',
      span: UNKNOWN_SPAN,
    } as ObjectExpression

    const appendKeyValueProperty = (key: string, value: string) => {
      const keyLiteral: StringLiteral = {
        span: UNKNOWN_SPAN,
        type: 'StringLiteral',
        value: key,
        raw: `\"${key}\"`,
      }
      const valueLiteral: StringLiteral = {
        span: UNKNOWN_SPAN,
        type: 'StringLiteral',
        value: value,
        raw: `\"${value}\"`,
      }
      properties.push({
        type: 'KeyValueProperty',
        key: keyLiteral,
        value: valueLiteral,
      })
    }

    appendRootDeclarator(init)

    const variable: VariableDeclaration = {
      type: 'VariableDeclaration',
      declarations,
      kind,
      span: UNKNOWN_SPAN,
      ctxt: 0,
      declare: false,
    }

    return {
      variable,
      name,
      appendKeyValueProperty,
    }
  }
}
