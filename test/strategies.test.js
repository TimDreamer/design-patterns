import Validator, { TYPES } from '@/strategies'

describe('validate form by using strategies', () => {
  const PHONE = '0912345678'

  const rules = {
    email: TYPES.EMAIL,
    phone1: TYPES.PHONE_NUMBER,
    phone2: TYPES.PHONE_NUMBER,
    name: TYPES.VALID_NAME,
  }

  test('valid data', () => {
    const data = {
      email: '123.456@gmail.com.tw',
      phone1: PHONE,
      phone2: +PHONE,
      name: 'Tim Lu',
    }

    const validator = new Validator({ data, rules })
    expect(() => validator.validate()).not.toThrow()
  })

  describe('invalid data', () => {
    test('invalid email', () => {
      const wrongEmail = new Validator({
        data: {
          email: '123.3456',
        },
        rules: {
          email: TYPES.EMAIL,
        },
      })
      expect(() => wrongEmail.validate()).toThrow()
    })

    test('invalid phone', () => {
      const wrongPhone = new Validator({
        data: {
          phone: '+912345612',
        },
        rules: {
          phone: TYPES.PHONE_NUMBER,
        },
      })
      expect(() => wrongPhone.validate()).toThrow()

      const wrongPhone1 = new Validator({
        data: {
          phone: '09123456123456',
        },
        rules: {
          phone: TYPES.PHONE_NUMBER,
        },
      })
      expect(() => wrongPhone1.validate()).toThrow()

      const wrongPhone2 = new Validator({
        data: {
          phone: {
            val: PHONE,
          },
        },
        rules: {
          phone: TYPES.PHONE_NUMBER,
        },
      })
      expect(() => wrongPhone2.validate()).toThrow()
    })

    test('invalid name', () => {
      const wrongName = new Validator({
        data: {
          name: '123.3456',
        },
        rules: {
          name: TYPES.VALID_NAME,
        },
      })
      expect(() => wrongName.validate()).toThrow()
    })
  })
})
