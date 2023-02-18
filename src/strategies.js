export const TYPES = {
  LENGTH: 'LENGTH',
  PHONE_NUMBER: 'PHONE_NUMBER',
  EMAIL: 'EMAIL',
  VALID_NAME: 'VALID_NAME',
}

const strategies = {
  [TYPES.LENGTH](val, target) {
    if (!val.length) {
      throw TypeError('No length prop.')
    }

    if (val.length !== target) {
      throw Error(`${val.length} should be ${target}`)
    }
  },

  [TYPES.PHONE_NUMBER](val) {
    if (typeof val === 'number') {
      val = '0' + String(val)
    }

    try {
      strategies[TYPES.LENGTH](val, 10)
      if (!/09\d{8}/.test(val)) {
        throw TypeError('Not a phone number')
      }
    } catch (error) {
      throw error
    }
  },

  [TYPES.EMAIL](val) {
    if (!/.+\@.+/.test(val)) {
      throw TypeError('Not an email.')
    }
  },

  [TYPES.VALID_NAME](val) {
    if (!/[^\d\W]+/.test(val)) {
      throw TypeError('Not a valid name')
    }
  },
}

export default class Validator {
  constructor({ data, rules }) {
    this.data = data
    this.rules = rules
    this.strategies = strategies
  }

  validate() {
    for (const key of Object.keys(this.rules)) {
      if (key in this.data) {
        this.strategies[this.rules[key]](this.data[key])
      }
    }
  }
}
