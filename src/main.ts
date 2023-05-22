import {
  isArray,
  isBigInt,
  isDate,
  isError,
  isFunction,
  isMap,
  isObject,
  isRegExp,
  isSet,
  isSymbol,
} from './interface'

function deepCopy(val: Record<any, any>, map = new WeakMap()) {
  if (isSymbol(val)) return Symbol(val.description)

  if (isSet(val)) {
    const newSet = new Set()
    for (const setItem of val) {
      newSet.add(deepCopy(setItem))
    }
    return newSet
  }

  if (isMap(val)) {
    const newMap = new Map()
    for (const mapItem of val) {
      newMap.set(mapItem[0], deepCopy(mapItem[1] as any))
    }
    return newMap
  }

  if (isFunction(val)) return val

  if (isDate(val)) return new Date(val)

  if (isRegExp(val)) return RegExp(val)

  if (isError(val)) return Error(val.message)

  if (isBigInt(val)) return BigInt(val as bigint)

  if (!isObject(val)) return val

  // * 解决循环引用
  if (map.get(val)) return map.get(val)
  // * 对象类型创建对象，反之创建数组
  const newObj: Record<any, any> = isArray(val) ? [] : {}
  map.set(val, newObj)

  for (const key in val) {
    newObj[key] = deepCopy(val[key], map)
  }

  // * Symbol key
  const smKeys = Object.getOwnPropertySymbols(val)
  for (const smkey of smKeys) {
    newObj[Symbol(smkey.description) as any] = deepCopy(val[smkey as any], map)
  }

  return newObj
}
const set = new Set([1, 2, 3])
const map = new Map()
map.set('a', 1)
map.set('c', 3)
const sm = Symbol('tao')
const s1 = Symbol('tao')
const reg = /(\w+)\s(\w+)/
const abc = BigInt(1111111111111111111111111)
const info = {
  name: 'tao',
  age: 18,
  friends: {
    name: 'sandy',
    age: 21,
  },
  arr: [1, 2, 3, 4],
  sayHello: () => {
    console.log('sayHello')
  },
  set,
  sm,
  [s1]: 'aaa',
  self: {},
  date: new Date(),
  reg,
  abc,
  error: new Error('123s'),
  map,
}
info.self = info
const newObj = deepCopy(info)
console.log(newObj)

