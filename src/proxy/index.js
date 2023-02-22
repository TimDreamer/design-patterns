/** loading proxy */
const setImage = (() => {
  const img = document.createElement('img')
  const root = document.getElementById('app')
  root.appendChild(img)

  return {
    setSrc(url) {
      img.src = url
    },
  }
})()

// proxy
const proxySetImage = ((_setImage) => {
  const img = new Image()
  img.onload = () => {
    // loading complete
    _setImage.setSrc(img.src)
  }

  return {
    setSrc(url) {
      _setImage.setSrc('./img/loading.gif')
      // trigger img.onload
      img.src = url
    },
  }
})(setImage)

proxySetImage.setSrc('./img/cover.jpg')

/** cache proxy */
const printLog = (s) => {
  console.log(s)
}

const applyProxy = (fn) => {
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
      }, 3000)
    }
  }
}
const proxyPrintLog = applyProxy(printLog)
for (let i = 0; i < 5; i++) {
  proxyPrintLog(i)
}

setTimeout(() => {
  for (let i = 0; i < 5; i++) {
    proxyPrintLog(i)
  }
}, 5000)
