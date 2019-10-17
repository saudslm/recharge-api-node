'use strict';

const assign = require('lodash/assign');
const qs = require('qs');

/**
 * This provides methods used by resources that have no relationships with
 * other resources. It's not meant to be used directly.
 *
 * @mixin
 */

const base = {
    /**
     *
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     */
    count(params) {
        const key = 'count',
              url = this.buildUrl(key, params);
        return this.recharge.request(url, 'GET', key);
    },

    /**
     *
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     */
    create(params) {
        const url = this.buildUrl();
        return this.recharge.request(url, 'POST', this.key, params);
    },

    /**
     * @param {Number} id record id
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     */
    get(id, params) {
        const url = this.buildUrl(id, params);
        return this.recharge.request(url, 'GET', this.key);
    },

    /**
     * @param {Object} [params] Query parameters
     * @return {Promise} Promise that resolves with the result
     */
    list(params) {
        const url = this.buildUrl(undefined, params);
        return this.recharge.request(url, 'GET', this.name);
    },

    /**
     * @param {Number} id record id
     * @param {Object} params Record properties
     * @return {Promise} Promise that resolves with the result
     */
    update(id, params) {
        const url = this.buildUrl(id);
        return this.recharge.request(url, 'PUT', this.key, params);
    },

    /**
     * @param {Number} id record id
     * @return {Promise} Promise that resolves with the result
     */
    delete(id) {
        const url = this.buildUrl(id);
        return this.recharge.request(url, 'DELETE');
    },

    /**
     * Builds the request URL.
     *
     * @param {*} id
     * @param {*} query
     */
    buildUrl(id, query, endpoint_ext) {
        id || id === 0 || (id = '');

        let path = `/${this.name}/${id}`;
        if( endpoint_ext ){
            path += `/${endpoint_ext}`;
        }
        path = path.replace(/\/+/g, '/').replace(/\/$/, '');

        if (query) path += '?' + qs.stringify(query, { arrayFormat: 'brackets' });

        return assign({ path }, this.recharge.baseUrl);
    }
};

module.exports = base;