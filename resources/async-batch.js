'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates a AsyncBatch instance.
 *
 * @param {Recharge} recharge Reference to the Recharge instance
 * @constructor
 * @public
 */
function AsyncBatch(recharge) {
  this.recharge = recharge;

  this.name = 'async_batches';
  this.key = 'async_batch';
}

assign(AsyncBatch.prototype, pick(base, ['buildUrl', 'list', 'get', 'create']));

/**
 * Add Tasks to a Batch.
 *
 * @param {String} batch_id Batch Id
 * @param {Object} params
 * @return {Promise} Promise that resolves with the result
 * @public
 */
AsyncBatch.prototype.addTasks = function addTasks(batch_id, params) {
  const url = this.buildUrl(batch_id, undefined, 'tasks');
  return this.recharge.request(url, 'POST', undefined, params);
};

/**
 * List tasks in a Batch
 *
 * @param {String} checkout_token Checkout Token
 * @param {Object} params
 * @return {Promise} Promise that resolves with the result
 * @public
 */
AsyncBatch.prototype.tasks = function tasks(batch_id) {
    const url = this.buildUrl(batch_id, undefined, 'tasks');
    return this.recharge.request(url, 'GET', 'async_batch_tasks');
};

/**
 * Process AsyncBatch.
 *
 * @param {String} checkout_token Checkout Token
 * @param {Object} params
 * @return {Promise} Promise that resolves with the result
 * @public
 */
AsyncBatch.prototype.process = function process(batch_id) {
    const url = this.buildUrl(batch_id, undefined, 'process');
    return this.recharge.request(url, 'POST');
};

module.exports = AsyncBatch;