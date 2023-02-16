export const getSingleton = (Class) => {
  let _instance = null
  const f = function (...args) {
    return _instance || (_instance = new Class(...args))
  }
  f.getInstance = f

  return f
}
