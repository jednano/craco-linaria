import foo from 'src/index'

describe('index', () => {
	describe('foo', () => {
		it('returns "bar"', () => {
			expect(foo()).toBe('bar')
		})
	})
})
