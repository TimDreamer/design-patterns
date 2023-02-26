// proxy
export const getProxySetImage = (_setImage, placeholder) => {
  const img = new Image()
  img.onload = () => {
    // loading complete
    _setImage.setSrc(img.src)
  }

  return {
    setSrc(url) {
      _setImage.setSrc(placeholder)
      // trigger img.onload
      img.src = url
    },
  }
}

export const applyProxy = (fn, delay = 3000) => {
  let cache = []
  let timer = null
  return function (...args) {
    cache.push(() => fn.apply(this, args))
    if (!timer) {
      timer = setTimeout(() => {
        cache.forEach((cb) => cb())
        cache = []
        clearTimeout(timer)
        timer = null
        console.log('one round')
      }, delay)
    }
  }
}
