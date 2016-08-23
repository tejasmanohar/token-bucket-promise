/**
 * Module dependencies.
 */

import 'babel-polyfill';


/**
 * Token Bucket Filter.
 * @class
 * @access public
 */
class TokenBucketFilter {
  /**
   * New TokenBucketFilter.
   * @constructor
  */
  constructor(times, period=1000) {
    this.tokens = 0;
    this.bucketSize = times;

    this.refreshInterval = period/times;
    setInterval(this._tick, this.refreshInterval)
  }

  /**
   * Ticks.
   * @access protected
  */
  _tick() {
    this.tokens = Math.min(this.bucketSize, this.tokens + 1);
  }

  /**
   * Uses token.
   * @access public
   * @returns Promise
  */
  async take() {
    while (this.tokens === 0) {
      await Promise.delay(this.refreshInterval);
    }

    this.tokens = Math.max(this.tokens - 1, 0);
  }
}


/**
 * Exports.
 */

export default TokenBucketFilter;
