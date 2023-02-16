import { currying, uncurrying } from '@/currying'

describe('test curring & uncurrying', () => {
  test('curring', () => {
    const add = (...args) => {
      return args.reduce((acc, n) => acc + n, 0)
    }

    const add10and5 = currying(add, 10, 5)
    expect(add10and5(20, 15)).toBe(50)
  })

  test('uncurrying', () => {
    const push = uncurrying(Array.prototype.push)
    const data1 = [1, 2, 3, 7, 8, 9],
      data2 = [5, 6, 7],
      LEN = data1.length + data2.length
    push(data1, ...data2)
    expect(data1).toHaveLength(LEN)
  })
})
