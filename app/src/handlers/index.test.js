const mocha = require('mocha')
const expect = require('expect')

const describe = mocha.describe
const it = mocha.it

const handlers = require('./index')

const boilerplate = handler => {
  describe(handler, () => {
    it('is a function', function () {
      expect(typeof handlers[handler]).toEqual('function')
    })

    it('emits an action', function () {
      const context = {
        t: x => x,
        emit: x => x
      }
      const emitSpy = expect.spyOn(context, 'emit')
      handlers[handler].call(context)

      expect(emitSpy).toHaveBeenCalled()
    })
  })
}

describe('handlers', () => {
  boilerplate('Launch')
  boilerplate('RandomCharacterIntent')
  boilerplate('RandomCharacter')
})
