type UnionToIntersection<U> =
  (U extends any ?
    (k: U) => void : never) extends ((k: infer I) => void) ? I : never

function pushProp(
  target: { [key: string]: any },
  key: string,
  value: any
): void {
  if (key === 'className') {
    target.className = [target.className, value].join(' ').trim()
  } else if (key === 'style') {
    target.style = { ...target.style, ...value }
  } else if (typeof value === 'function') {
    const oldFn = target[key] as Function | undefined
    target[key] = oldFn ? (...args: any[]) => {
      oldFn(...args);
      (value as Function)(...args)
    } : value
  } else if (value === undefined) {
    return
  } else {
    target[key] = value
  }
}

export function mergeProps<T extends {}[]>(...list: T): {
  [K in keyof UnionToIntersection<T[number]>]:
      K extends 'className' ? string :
      K extends 'style' ? UnionToIntersection<T[number]>[K] :
      Exclude<
        Extract<T[number], { [Q in K]: unknown }>[K],
        undefined
      >
} {
  const listLength = list.length
  if (listLength === 0) {
    return {} as any
  }
  if (listLength === 1) {
    return list[0] as any
  }
  return list.reduce((merged, ps: any) => {
    for (const key in ps) {
      pushProp(merged, key, ps[key])
    }
    return merged
  }, {}) as any
}

export default mergeProps
