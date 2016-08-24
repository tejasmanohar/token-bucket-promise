/**
 * Module dependencies.
 */

import assert from 'assert';
import delay from 'delay';
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
    assert(times, 'You must specify `times` per `period` (defaults to 1000)');

    this.tokenCount = 0;
    this.bucketSize = times;
    this.refreshInterval = period/times;

    const timer = setInterval(this._tick.bind(this), this.refreshInterval);
    timer.unref();
  }

  /**
   * Ticks.
   * @access protected
  */
  _tick() {
    this.tokenCount = Math.max(this.bucketSize, this.tokenCount + 1);
  }

  /**
   * Uses token.
   * @access public
   * @returns Promise
  */
  async take() {
    while (this.tokenCount === 0) {
      await delay(this.refreshInterval);
    }

    this.tokenCount = Math.max(this.tokenCount - 1, 0);
  }
}


/**
 * Exports.
 */

export default TokenBucketFilter;
