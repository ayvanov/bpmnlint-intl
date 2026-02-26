'use strict';

const en = require('./locales/en');
const ru = require('./locales/ru');

/**
 * @type { Record<string, Record<string, string>> }
 */
const locales = { en, ru };

/**
 * @type { string }
 */
let currentLocale = 'en';

/**
 * Set the active locale for rule messages.
 *
 * @param { string } locale - Locale code, e.g. 'en' or 'ru'
 *
 * @throws { Error } if the locale is not supported
 */
function setLocale(locale) {
  if (!locales[locale]) {
    throw new Error(
      `Unsupported locale: "${locale}". Available locales: ${Object.keys(locales).join(', ')}`
    );
  }
  currentLocale = locale;
}

/**
 * Get the currently active locale code.
 *
 * @return { string }
 */
function getLocale() {
  return currentLocale;
}

/**
 * Translate a message key into the current locale, with optional parameter interpolation.
 *
 * Parameters are interpolated using the `{paramName}` syntax:
 *
 *   t('foo.bar', { type: 'Process' })
 *   // locale string: '{type} is missing end event'
 *   // result:        'Process is missing end event'
 *
 * Falls back to English when a key is missing in the active locale.
 * Returns the raw key when it is missing from all locales.
 *
 * @param { string } key
 * @param { Record<string, string> } [params]
 *
 * @return { string }
 */
function t(key, params) {
  const messages = locales[currentLocale] || locales['en'];

  let message = messages[key];

  if (message === undefined) {
    message = locales['en'][key];
  }

  if (message === undefined) {
    return key;
  }

  if (params) {
    message = message.replace(/\{(\w+)\}/g, (match, name) => {
      return params[name] !== undefined ? String(params[name]) : match;
    });
  }

  return message;
}

module.exports = { t, setLocale, getLocale };
