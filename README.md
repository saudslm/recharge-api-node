# Recharge API Node.js
Recharge API bindings for Node.js

## Installation:

```shell
$ npm install --save recharge-api-node
```

## API

This module exports a constructor function which takes an options object.


### `Recharge(options)`

Creates a new `Recharge` instance.

#### Arguments

- `options` - Required - A plain JavaScript object that contains the
  configuration options.

#### Options

- `apiKey` - Required - A
  string that specifies the API key of the app.
- `secrete` - A string that specifies the secrete of the app.
- `autoLimit` - Optional - This option allows you to regulate the request rate
  in order to avoid hitting the [rate limit][api-call-limit]. Requests are
  limited using the token bucket algorithm. Accepted values are a boolean or a
  plain JavaScript object. When using an object, the `calls` property and the
  `interval` property specify the refill rate and the `bucketSize` property the
  bucket size. For example `{ calls: 2, interval: 1000, bucketSize: 35 }`
  specifies a limit of 2 requests per second with a burst of 35 requests. When
  set to `true` requests are limited as specified in the above example. Defaults
  to `false`.
  presentment prices for products. Defaults to `false`.
- `timeout` - Optional - The number of milliseconds before the request times
  out. If the request takes longer than `timeout`, it will be aborted. Defaults
  to `60000`, or 1 minute.

#### Return value

A `Recharge` instance.

#### Exceptions

Throws an `Error` exception if the required options are missing.

#### Example

```js
const Recharge = require('recharge-api-node');

const recharge = new Recharge({
  apiKey: 'your-api-key',
  secrete: 'your-app-secrete'
});
```

### Resources

Every resource is accessed via your `recharge` instance:

```js
const recharge = new Recharge({
  apiKey: 'your-api-key',
  secrete: 'your-app-secrete'
});

// recharge.<resource_name>.<method_name>
```
Each method returns a `Promise` that resolves with the result:

```js
recharge.subscription
  .list({ limit: 5 })
  .then((subscriptions) => console.log(subscriptions))
  .catch((err) => console.error(err));
```

### Available resources and methods

- [address](https://developer.rechargepayments.com/#addresses)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
  - `validate(params)`
  - `addDiscount(id, params)`
  - `removeDiscount(id, params)`
- [charge](https://developer.rechargepayments.com/#charges)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
  - `changeNextChargeDate(id, params)`
  - `skip(id, params)`
  - `unskip(id, params)`
  - `refund(id, params)`
  - `addDiscount(id, params)`
  - `removeDiscount(id, params)`
- [collection](https://developer.rechargepayments.com/#collections)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
- [customerAddress](https://developer.rechargepayments.com/#list-addresses)
  - `list(customer_id[, params])`
- [customer](https://developer.rechargepayments.com/#customers)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
  - `getPaymentSources(id)`
- [discount](https://developer.rechargepayments.com/#discounts)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
  - `addToAddress(address_id[, params])`
  - `removeFromAddress(address_id[, params])`
  - `addToCharge(charge_id[, params])`
  - `removeFromCharge(charge_id[, params])`
- [metafield](https://developer.rechargepayments.com/#metafields)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
- [order](https://developer.rechargepayments.com/#orders)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
  - `changeShippingDate(id, params)`
  - `changeOrderVariant(id, shopify_variant_id, params)`
  - `clone(id, charge_id, params)`
- [product](https://developer.rechargepayments.com/#products)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
- [shop](https://developer.rechargepayments.com/#shop)
  - `get()`
  - `getShippingCountries()`
- [subscription](https://developer.rechargepayments.com/#subscriptions)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
  - `changeNextChargeDate(id, params)`
  - `changeAddress(id, params)`
  - `cancel(id, params)`
  - `activate(id)`
  - ```** 'swap product' end point can be triggered using 'update()' function```
- [webhook](https://developer.rechargepayments.com/#webhooks)
  - `count()`
  - `list([params])`
  - `get(id[, params])`
  - `create(params)`
  - `update(id, params)`
  - `delete(id)`
  - `validate(request_body, secrete)`

where `params` is a plain JavaScript object. See
https://developer.rechargepayments.com/#webhooks for parameters details.