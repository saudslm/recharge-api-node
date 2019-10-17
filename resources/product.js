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
function Product(recharge) {
    this.recharge = recharge;

    this.name = 'products';
    this.key = 'product';
}

assign(Product.prototype, pick(base, [
    'buildUrl',
    'get',
    'list',
    'count'
]));

module.exports = Product;