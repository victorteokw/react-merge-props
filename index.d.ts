// Copied from https://github.com/andrewbranch/merge-props/blob/master/src/index.ts

type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

declare function mergeProps<T extends {}[]>(...props: T): {
  [K in keyof UnionToIntersection<T[number]>]:
    K extends 'className' ? string :
    K extends 'style' ? UnionToIntersection<T[number]>[K] :
    Extract<T[number], { [Q in K]: unknown }>[K];
}

export default mergeProps;
