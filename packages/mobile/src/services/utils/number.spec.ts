import { NumberUtils } from './number'

describe('formatCurrency', () => {
  it('should format correctly', () => {
    expect(NumberUtils.formatCurrency(1000)).toEqual('$1,000.00')
  })
})
