'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

function Metafield(recharge){
    this.recharge = recharge;

    this.name = 'metafields';
    this.key = 'metafield';
}

assign(Metafield.prototype, base);

module.exports = Metafield;