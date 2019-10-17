'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates an Product instance.
 *
 * @param {Recharge} recharge Reference to the Recharge instance
 * @constructor
 * @public
 */
function Shop(recharge) {
    this.recharge = recharge;

    this.name = 'shop';
    this.key = 'shop';
}

assign(Shop.prototype, pick(base, [
    'buildUrl'
]));

Shop.prototype.get = function get(){
    const url = this.buildUrl();
    return this.recharge.request(url, 'GET', this.name);
}

Shop.prototype.getShippingCountries = function getShippingCountries(){
    const url = this.buildUrl('shipping_countries');
    return this.recharge.request(url, 'GET', 'shipping_countries');
}

module.exports = Shop;