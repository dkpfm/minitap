import _ from 'underscore'
// import { XORShift } from 'random-seedable'

export default function createRandomSequence({ amount = 1, seed = 0 } = {}) {
  const random = new SeededRandom(seed)
  const numbers = _.range(amount).map((i) => random.range(0, 15))
  return _.sortBy(numbers, (n) => n)
  return numbers
}

class SeededRandom {
  constructor(seed = Date.now()) {
    this.state0 = this._murmurHash3(seed)
    this.state1 = this._murmurHash3(this.state0)
  }

  _murmurHash3(h) {
    h = Math.imul(h, 0xcc9e2d51)
    h = Math.imul((h << 15) | (h >>> 17), 0x1b873593)
    h = Math.imul((h << 13) | (h >>> 19), 5) + 0xe6546b64
    h ^= h >>> 16
    h = Math.imul(h, 0x85ebca6b)
    h ^= h >>> 13
    h = Math.imul(h, 0xc2b2ae35)
    h ^= h >>> 16
    return h >>> 0
  }

  next() {
    const s1 = this.state0
    const s0 = this.state1
    this.state0 = s0
    let s1_ = s1
    s1_ ^= s1_ << 23
    s1_ ^= s1_ >>> 17
    s1_ ^= s0
    s1_ ^= s0 >>> 26
    this.state1 = s1_
    return (this.state0 + this.state1) >>> 0
  }

  float() {
    return this.next() / 4294967296
  }

  range(min, max) {
    return this.float() * (max - min + 1) + min
  }
}
