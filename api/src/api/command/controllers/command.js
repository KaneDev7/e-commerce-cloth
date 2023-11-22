'use strict';

/**
 * command controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::command.command');
