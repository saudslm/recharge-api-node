'use strict';

const assign = require('lodash/assign');
const pick = require('lodash/pick');
const base = require('../mixins/base');

function OneTime(recharge){
    this.recharge = recharge;

    this.name = 'onetimes';
    this.key = 'onetime';
}

assign(OneTime.prototype, pick(base, [
    'buildUrl',
    'get',
    'list',
    'update',
    'delete'
]));

OneTime.prototype.create = function create(address_id, params){
    const url = this.buildUrl('address', null, address_id);
    return this.recharge.request(url, 'POST', this.key, params);
}

module.exports = OneTime;