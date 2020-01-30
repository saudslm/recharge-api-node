'use strict';

const crypto = require('crypto');

const assign = require('lodash/assign');

const base = require('../mixins/base');

function Webhook(recharge){
    this.recharge = recharge;

    this.name = 'webhooks';
    this.key = 'webhook';
}

assign(Webhook.prototype, base);

Webhook.prototype.validate = function validate(secret, body, received_digest){
    const hash = crypto.createHmac('sha256', secret)
                .update(body)
                .digest('hex');
    return hash === received_digest;
}

module.exports = Webhook;