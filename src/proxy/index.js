import { getProxySetImage, applyProxy } from './utils.js'
import COVER from './img/cover.jpg'
import LOADING from './img/loading.gif'

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
const proxySetImage = getProxySetImage(setImage, LOADING)
proxySetImage.setSrc(COVER)

/** cache proxy */
const printLog = (s) => {
  console.log(s)
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
