'use strict';

const assign = require('lodash/assign');

const base = require('../mixins/base');

function Webhook(recharge){
    this.recharge = recharge;

    this.name = 'webhooks';
    this.key = 'webhook';
}

assign(Webhook.prototype, base);

Webhook.prototype.validate = function validate(){
    
}

module.exports = Webhook;