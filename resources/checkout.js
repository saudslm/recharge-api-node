'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a Charge instance.
 *
 * @param {Recharge} recharge Reference to the Recharge instance
 * @constructor
 * @public
 */
function Checkout(recharge) {
  this.recharge = recharge;

  this.name = 'checkouts';
  this.key = 'checkout';
}

assign(Checkout.prototype, pick(base, ['buildUrl', 'get', 'create', 'update']));

/**
 * GET Shipping Rates.
 *
 * @param {String} checkout_token Checkout Token
 * @param {Object} params
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Checkout.prototype.getShippingRates = function getShippingRates(checkout_token) {
  const url = this.buildUrl(checkout_token, undefined, 'shipping_rates');
  return this.recharge.request(url, 'GET', 'shipping_rates');
};

/**
 * Process Checkout/Charge.
 *
 * @param {String} checkout_token Checkout Token
 * @param {Object} params
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Checkout.prototype.process = function process(checkout_token, params) {
    const url = this.buildUrl(checkout_token, undefined, 'charge');
    return this.recharge.request(url, 'POST', 'checkout_charge', params);
};

module.exports = Checkout;