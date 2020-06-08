'use strict';

const map = {
  address: 'address',
  charge: 'charge',
  checkout: 'checkout',
  collection: 'collection',
  customer: 'customer',
  customerAddress: 'customer-address',
  discount: 'discount',
  metafield: 'metafield',
  order: 'order',
  oneTime: 'one-time',
  product: 'product',
  subscription: 'subscription',
  shop: 'shop',
  webhook: 'webhook',
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