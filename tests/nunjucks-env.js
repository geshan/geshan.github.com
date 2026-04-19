/**
 * Shared Nunjucks environment for template rendering tests.
 * Configures the same filters as .eleventy.js so templates render identically.
 */
const nunjucks = require('nunjucks');
const { DateTime } = require('luxon');
const path = require('path');

function createEnv() {
  const env = new nunjucks.Environment(
    new nunjucks.FileSystemLoader(path.join(__dirname, '..', '_includes')),
    { autoescape: true }
  );

  env.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd-LLL-yyyy');
  });

  env.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
  });

  env.addFilter('displayDateOnly', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('dd-LLL-yyyy');
  });

  env.addFilter('getSitemapDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toISODate();
  });

  return env;
}

module.exports = { createEnv };
