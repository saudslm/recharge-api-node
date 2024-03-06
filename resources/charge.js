'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');
const baseChild = require('../mixins/base-child');

/**
 * Creates a Charge instance.
 *
 * @param {Recharge} recharge Reference to the Recharge instance
 * @constructor
 * @public
 */
function Charge(recharge) {
  this.recharge = recharge;

  this.name = 'charges';
  this.key = 'charge';
}

assign(Charge.prototype, pick(base, ['buildUrl', 'get', 'count', 'list']));

/**
 * Updates a next charge date.
 *
 * @param {Number} id Charge ID
 * @param {Object} params {'next_charge_date': '2018-11-14T09:45:44'}
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Charge.prototype.changeNextChargeDate = function(id, params) {
  const url = this.buildUrl(id, undefined, 'change_next_charge_date');
  return this.recharge.request(url, 'POST', this.key, params);
};

/**
 * Skip charge for given charge id.
 *
 * @param {Number} id Charge ID
 * @param {Object} params {'subscription_id': 12345553}
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Charge.prototype.skip = function(id, params) {
    const url = this.buildUrl(id, undefined, 'skip');
    return this.recharge.request(url, 'POST', this.key, params);
};

/**
 * Unskip charge for given charge id.
 *
 * @param {Number} id Charge ID
 * @param {Object} params {'subscription_id': 12345553}, look at the documentation for more details.
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Charge.prototype.unskip = function(id, params) {
    const url = this.buildUrl(id, undefined, 'unskip');
    return this.recharge.request(url, 'POST', this.key, params);
};

/**
 * Refund charge for given charge id.
 *
 * @param {Number} id Charge ID
 * @param {Object} params {'subscription_id': 12345553}, look at the documentation for more details.
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Charge.prototype.refund = function(id, params) {
    const url = this.buildUrl(id, undefined, 'refund');
    return this.recharge.request(url, 'POST', this.key, params);
};

/**
 * Add discount for given charge id.
 *
 * @param {Number} id Charge ID
 * @param {Object} params
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Charge.prototype.addDiscount = function addDiscount(charge_id, params){
  const url = this.buildUrl(charge_id, undefined, 'apply_discount');
  return this.recharge.request(url, 'POST', this.key, params);
}

/**
 * Remove discount for given charge id, without destroying the discount.
 *
 * @param {Number} id Charge ID
 * @param {Object} params
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Charge.prototype.removeDiscount = function removeDiscount(charge_id, params){
  const url = this.buildUrl(charge_id, undefined, 'remove_discount');
  return this.recharge.request(url, 'POST', this.key, params);
}

/**
 * Process the charge by using chargeID.
 *
 * @param {Number} id Charge ID
 * @return {Promise} Promise that resolves with the result
 * @public
 */
Charge.prototype.process = function processCharge(charge_id){
  const url = this.buildUrl(charge_id, undefined, 'process');
  return this.recharge.request(url, 'POST', this.key, charge_id);
}
module.exports = Charge;
