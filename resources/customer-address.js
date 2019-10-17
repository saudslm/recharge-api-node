'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const baseChild = require('../mixins/base-child');

/**
 * Creates an CustomerAddress instance.
 *
 * @param {Recharge} recharge Reference to the Recharge instance
 * @constructor
 * @public
 */
function CustomerAddress(recharge) {
    this.recharge = recharge;

    this.parentName = 'customers';
    this.name = 'addresses';
    this.key = 'address';
}

assign(CustomerAddress.prototype, pick(baseChild, [
    'buildUrl'
]));

CustomerAddress.prototype.list = function list(customerId, params) {
    const url = this.buildUrl(customerId, undefined, params);
    return this.recharge.request(url, 'GET', this.name);
};

module.exports = CustomerAddress;