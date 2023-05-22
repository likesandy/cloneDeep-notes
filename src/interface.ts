const toString = Object.prototype.toString

const is = (val: any, type: string) => {
  return toString.call(val) === `[object ${type}]`
}

export const isObject = (val: any): val is Record<any, any> => {
  return val !== null && is(val, 'Object')
}

export const isArray = (val: any): val is any[] => {
  return Array.isArray(val)
}

export const isSet = (val: unknown): val is Set<any> => {
  return val instanceof Set
}

export const isMap = <K, V>(val: unknown): val is Map<K, V> => {
  return val instanceof Map<K, V>
}

export const isSymbol = (val: any): val is Symbol => {
  return typeof val === 'symbol'
}

export const isFunction = (val: any): val is Function => {
  return is(val, 'Function')
}

export const isDate = (val: unknown): val is Date => {
  return is(val, 'Date')
}

export const isRegExp = (val: unknown): val is RegExp => {
  return is(val, 'RegExp')
}

export const isBigInt = (val: unknown): val is BigInt => {
  return typeof val === 'bigint'
}

export const isError = (val: unknown): val is Error => {
  return is(val, 'Error')
}

