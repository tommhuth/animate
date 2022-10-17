interface AnimateParams<T> {
    from: T,
    to: T,
    duration?: number,
    delay?: number, 
    easing?: (t: number) => number,
    render: (values: T) => void,
    cancel?: () => void,
    start?: () => void,
    end?: () => void,
}

declare function animate<T>(params: AnimateParams<T>): () => void

export default animate