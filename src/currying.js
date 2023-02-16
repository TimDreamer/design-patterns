export function currying(f, ...oriArgs) {
  return function (...args) {
    return f(...oriArgs.concat(args))
  }
}

export function uncurrying(f) {
  return (...args) => {
    f.call(...args)
  }
}
