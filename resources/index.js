'use strict';

const map = {
  address: 'address',
  charge: 'charge',
  collection: 'collection',
  customer: 'customer',
  customerAddress: 'customer-address',
  metafield: 'metafield',
  product: 'product',
  subscription: 'subscription',
  webhook: 'webhook',
  shop: 'shop',
  order: 'order'
};

/**
 * Registers resources on the `Recharge` class.
 *
 * @param {Recharge} Recharge The `Recharge` class
 * @private
 */
function registerAll(Recharge) {
  Object.keys(map).forEach(prop => {
    Object.defineProperty(Recharge.prototype, prop, {
      configurable: true,
      get: function get() {
        const resource = require(`./${map[prop]}`);

        return Object.defineProperty(this, prop, {
          value: new resource(this)
        })[prop];
      },
      set: function set(value) {
        return Object.defineProperty(this, prop, { value })[prop];
      }
    });
  });
}

module.exports = {
  registerAll
};