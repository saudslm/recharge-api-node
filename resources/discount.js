'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

function Discount(recharge){
    this.recharge = recharge;

    this.name = 'discounts';
    this.key = 'discount';
}

assign(Discount.prototype, base);

Discount.prototype.addToAddress = function addToAddress(address_id, params) {
    const path = `/addresses/${address_id}/apply_discount`;
    const url = assign({ path }, this.recharge.baseUrl);
    return this.recharge.request(url, 'POST', 'address', params);
};

Discount.prototype.addToCharge = function addToCharge(charge_id, params) {
    const path = `/charges/${charge_id}/apply_discount`;
    const url = assign({ path }, this.recharge.baseUrl);
    return this.recharge.request(url, 'POST', 'charge', params);
};

Discount.prototype.removeFromAddress = function removeFromAddress(address_id, params) {
    const path = `/addresses/${address_id}/remove_discount`;
    const url = assign({ path }, this.recharge.baseUrl);
    return this.recharge.request(url, 'POST', 'address', params);
};

Discount.prototype.removeFromCharge = function removeFromCharge(charge_id) {
    const path = `/charges/${charge_id}/remove_discount`;
    const url = assign({ path }, this.recharge.baseUrl);
    return this.recharge.request(url, 'POST', 'charge', params);
};

module.exports = Discount;
