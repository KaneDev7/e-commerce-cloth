'use strict';

/**
 * command service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::command.command');
