import { getSingleton } from '@/singleton'

class Test {
  constructor(...args) {
    this.args = args
  }

  printArgs() {
    return this.args.join()
  }
}

describe('singleton', () => {
  const args1 = [1, 2, 3],
    args2 = [5, 6, 7]
  const singletonTest = getSingleton(Test)

  test('use new keyword', () => {
    const t1 = new singletonTest(...args1)
    const t2 = new singletonTest(...args2)
    expect(t1.printArgs()).toBe(args1.join())
    expect(t1 === t2).toBeTruthy()
  })

  test('getInstance should work as well', () => {
    const t1 = new singletonTest(...args1)
    const t2 = singletonTest.getInstance(...args2)
    expect(t1.printArgs()).toBe(args1.join())
    expect(t2 === t1).toBeTruthy()
  })
})
