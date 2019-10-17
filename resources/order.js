'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

/**
 * Creates an Product instance.
 *
 * @param {Recharge} recharge Reference to the Recharge instance
 * @constructor
 * @public
 */
function Order(recharge) {
    this.recharge = recharge;

    this.name = 'orders';
    this.key = 'order';
}

assign(Order.prototype, base);

/**
 * Modify the shipping date of the order.
 */
Order.prototype.changeShippingDate = function changeShippingDate(order_id, params){
    const url = this.buildUrl(order_id, undefined, 'change_date');
    return this.recharge.request(url, 'POST', this.key, params);
}

/**
 * Modify the shopify product variant of the order.
 */
Order.prototype.changeOrderVariant = function changeOrderVariant(order_id, variant_id, params){
    const url = this.buildUrl(order_id, undefined, `update_shopify_variant/${variant_id}`);
    return this.recharge.request(url, 'POST', this.key, params);
}

/**
 * Clone orders. This endpoint can be used if you want to add a new order to successful charge.
 */
Order.prototype.clone = function clone(order_id, charge_id, params){
    const url = this.buildUrl(`clone_order_on_success_charge/${order_id}`, undefined, `charge/${charge_id}`);
    return this.recharge.request(url, 'POST', this.key, params);
}

module.exports = Order;