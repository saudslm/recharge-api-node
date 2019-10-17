'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');

const base = require('../mixins/base');

/**
 * Creates an Collection instance.
 *
 * @param {Recharge} recharge Reference to the Recharge instance
 * @constructor
 * @public
 */
function Collection(recharge) {
    this.recharge = recharge;

    this.name = 'collections';
    this.key = 'collection';
}

assign(Collection.prototype, pick(base, [
    'buildUrl',
    'get',
    'list',
    'count'
]));

module.exports = Collection;