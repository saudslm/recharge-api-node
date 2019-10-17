'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

function Subscription(recharge){
    this.recharge = recharge;

    this.name = 'subscriptions';
    this.key = 'subscription';
}

assign(Subscription.prototype, base);

/**
 * Update an existing subscription’s next charge date.
 */
Subscription.prototype.changeNextChargeDate = function changeNextChargeDate(subscription_id, params) {
    const url = this.buildUrl(subscription_id, undefined, 'set_next_charge_date');
    return this.recharge.request(url, 'POST', this.key, params);
}

/**
 * Update an existing subscription’s address.
 */
Subscription.prototype.changeAddress = function changeAddress(subscription_id, params) {
    const url = this.buildUrl(subscription_id, undefined, 'change_address');
    return this.recharge.request(url, 'POST', this.key, params);
}

/**
 * Cancel an active subscription.
 */
Subscription.prototype.cancel = function cancel(subscription_id, params) {
    const url = this.buildUrl(subscription_id, undefined, 'cancel');
    return this.recharge.request(url, 'POST', this.key, params);
}

/**
 * Activate a cancelled subscription.
 */
Subscription.prototype.activate = function cancel(subscription_id) {
    const url = this.buildUrl(subscription_id, undefined, 'activate');
    return this.recharge.request(url, 'POST', this.key);
}

module.exports = Subscription;