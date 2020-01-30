'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

function Address(recharge){
    this.recharge = recharge;

    this.name = 'addresses';
    this.key = 'address';
}

assign(Address.prototype, base);

/**
 * Address validation works only for USA addresses.
 */
Address.prototype.validate = function validate(params){
    const url = this.buildUrl('validate');
    return this.recharge.request(url, 'POST', undefined, params);
}

Address.prototype.addDiscount = function addDiscount(address_id, params){
    const url = this.buildUrl(address_id, undefined, 'apply_discount');
    return this.recharge.request(url, 'POST', this.key, params);
}

Address.prototype.removeDiscount = function removeDiscount(address_id, params){
    const url = this.buildUrl(address_id, undefined, 'remove_discount');
    return this.recharge.request(url, 'POST', this.key, params);
}

Address.prototype.addOneTimeProduct = function addOneTimeProduct(address_id, params){
    const url = this.buildUrl(address_id, undefined, 'onetimes');
    return this.recharge.request(url, 'POST', 'onetimes', params);
}

module.exports = Address;
