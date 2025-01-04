type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
export declare function mergeProps<T extends {}[]>(...list: T): {
    [K in keyof UnionToIntersection<T[number]>]: K extends 'className' ? string : K extends 'style' ? UnionToIntersection<T[number]>[K] : Exclude<Extract<T[number], {
        [Q in K]: unknown;
    }>[K], undefined>;
};
export default mergeProps;
//# sourceMappingURL=index.d.ts.map