import { getProxySetImage, applyProxy } from '@/proxy/utils.js'

describe('proxy', () => {
  beforeAll(() => {
    global.Image = function Image() {
      this._loadFunc = null
      this._timer = null
      this.src = null

      Object.defineProperty(this, 'onload', {
        set(f) {
          clearTimeout(this._timer)
          this._loadFunc = f
          this._timer = setTimeout(() => {
            this._loadFunc && this._loadFunc()
            this._loadFunc = null
          }, 500)
        },
      })
    }
  })

  afterAll(() => {
    global.Image = null
  })

  test('proxySetImage', async () => {
    const LOADING = './img/loading.gif'
    const COVER = './img/cover.jpg'

    const img = {
      src: null,
    }
    const setImage = {
      setSrc(url) {
        img.src = url
      },
    }
    const proxySetImage = getProxySetImage(setImage, LOADING)
    proxySetImage.setSrc(COVER)
    expect(img.src).toBe(LOADING)

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    expect(img.src).toBe(COVER)
  })

  test('applyProxy', async () => {
    const result = []
    const allArgs = [
      [1, 2],
      [3, 4],
      [5, 6],
    ]
    const testFunc = (...args) => {
      result.push(...args)
    }

    const proxyTestFunc = applyProxy(testFunc, 500)

    for (const args of allArgs) {
      proxyTestFunc(...args)
    }

    expect(result).toHaveLength(0)
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
    expect(result).toHaveLength(
      allArgs.reduce((total, args) => total + args.length, 0)
    )
    expect(result).toEqual(allArgs.flat())
  })
})
