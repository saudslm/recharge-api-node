'use strict';

const transform = require('lodash/transform');
const defaults = require('lodash/defaults');
const assign = require('lodash/assign');
const EventEmitter = require('events');
const stopcock = require('stopcock');
const got = require('got');
const urlLib = require('url');

const pkg = require('./package');
const resources = require('./resources');

function Recharge(options){
    if (!(this instanceof Recharge)) return new Recharge(options);

    if (
        !options ||
        !options.apiKey || !options.secrete
    ) {
        throw new Error('Missing or invalid options');
    }

    EventEmitter.call(this);
    this.options = defaults(options, { timeout: 60000 });

    //
    // API call limits, updated with each request.
    //
    this.callLimits = {
        remaining: undefined,
        current: undefined,
        max: undefined
    };

    this.baseUrl = {
        headers: {
            'X-Recharge-Access-Token': options.apiKey
        },
        hostname: 'api.rechargeapps.com',
        protocol: 'https:'
    };

    // handle api threshold
    if (options.autoLimit) {
        const conf = transform(options.autoLimit, (result, value, key) => {
          if (key === 'calls') key = 'limit';
          result[key] = value;
        }, { bucketSize: 35 });

        this.request = stopcock(this.request, conf);
    }
}

Object.setPrototypeOf(Recharge.prototype, EventEmitter.prototype);

/**
 * Updates API call limits.
 *
 * @param {String} header X-Recharge-Limit header
 * @private
 */
Recharge.prototype.updateLimits = function updateLimits(header) {
  if (!header) return;

  const limits = header.split('/').map(Number);
  const callLimits = this.callLimits;

  callLimits.remaining = limits[1] - limits[0];
  callLimits.current = limits[0];
  callLimits.max = limits[1];

  console.log('callLimits', callLimits);

  this.emit('callLimits', callLimits);
};

/**
 * Sends a request to a Recharge API endpoint.
 *
 * @param {Object} url URL object
 * @param {String} method HTTP method
 * @param {String} [key] Key name to use for req/res body
 * @param {Object} [params] Request body
 * @return {Promise}
 * @private
 */
Recharge.prototype.request = function request(url, method, key, params) {
    const options = assign({
      timeout: this.options.timeout,
      json: true,
      retries: 0,
      method
    }, url);

    options.headers['User-Agent'] = `${pkg.name}/${pkg.version}`;

    if (this.options.apiKey) {
      options.headers['X-Recharge-Access-Token'] = this.options.apiKey;
    }

    if (params) {
      //const body = key ? { [key]: params } : params;

      options.headers['Content-Type'] = 'application/json';
      options.body = params;
    }

    return got(options).then(res => {
      const body = res.body;

      this.updateLimits(res.headers['x-recharge-limit']);

      if (res.statusCode === 202) {
        const retryAfter = res.headers['retry-after'] * 1000 || 0;
        const path = urlLib.parse(res.headers['location']).path;
        const newUrl = assign({ path }, this.baseUrl);
        return delay(retryAfter)
          .then(() => this.request(newUrl, 'GET', key));
      }

      if (key) return body[key];
      return body || {};
    }, err => {
      this.updateLimits(
        err.response && err.response.headers['x-recharge-limit']
      );

      return Promise.reject(err);
    });
};

resources.registerAll(Recharge);

/**
 * Returns a promise that resolves after a given amount of time.
 *
 * @param {Number} ms Amount of milliseconds to wait
 * @return {Promise} Promise that resolves after `ms` milliseconds
 * @private
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = Recharge;