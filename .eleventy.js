const { DateTime } = require("luxon");
const fs = require("fs");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const blogTools = require("eleventy-plugin-blog-tools");
const htmlmin = require("html-minifier");
const workbox = require("workbox-build");
const { execSync } = require("child_process");


module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(blogTools);

  eleventyConfig.addPlugin(pluginSyntaxHighlight);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd-LLL-yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  eleventyConfig.addFilter("displayDateOnly", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd-LLL-yyyy");
  });

  eleventyConfig.addFilter("displayDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd-LLL-yyyy HH:MM:s");
  });

  eleventyConfig.addFilter("getSitemapDate", dateObj => {
    const dateInUTC = DateTime.fromJSDate(dateObj, {zone: 'utc'});
    return dateInUTC.toISODate();
  });

  eleventyConfig.addFilter("yearMonth", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("yyyy/LL");
  });

  function getYear(dateObj) {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("yyyy");
  };

  eleventyConfig.addFilter("getYear", getYear);

  eleventyConfig.addFilter("getPriority", dateObj => {
    const year = DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("yyyy");
    const currentYear = new Date().getFullYear();

    return year === String(currentYear) ? 0.8 : 0.7;
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("stripTags", (content) => {
    return content.replace(/<code>([^```]*)<\/code>/gmi, " some code ")
                  .replace(/(<([^>]+)>)/ig,"").replace(/\n/g,'');
  });

  eleventyConfig.addCollection("tagList", require("./_11ty/getTagList"));

  eleventyConfig.addCollection("posts", function(collection) {
    const coll = collection.getFilteredByTag("posts");
  
    for(let i = 0; i < coll.length ; i++) {
      const prevPost = coll[i-1];
      const nextPost = coll[i + 1];
  
      coll[i].data["prevPost"] = prevPost;
      coll[i].data["nextPost"] = nextPost;
      coll[i].year = getYear(coll[i].date);
    }
  
    return coll;
  });

  eleventyConfig.addCollection("latestPosts", function(collection) {
    return collection.getFilteredByTag("posts").sort(function(a, b) {
      a.year = getYear(a.date);
      return b.date - a.date;
    });
  });

  eleventyConfig.addShortcode("excerptMore", require("./_custom/excerptMore"));

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if( outputPath && outputPath.endsWith(".html") ) {
      try {
        let minified = htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        });
        return minified; 
      } catch (e) {
        console.log(`Error minifying: ${outputPath}  -- message: `, e.message);
        return content;
      }
    }

    return content;
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  //PWA

  eleventyConfig.on('eleventy.after', async () => {
    // see https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-GenerateSWOptions
    const options = {
        cacheId: 'sw',
        skipWaiting: true,
        clientsClaim: true,
        offlineGoogleAnalytics: true,
        ignoreURLParametersMatching: [/\/api\//, /^utm_/, /^fbclid$/],
        swDest: `_site/sw.js`,  // TODO change public to match your dir.output
        globDirectory: '_site',  // TODO change public to match your dir.output
        globPatterns: [
            '**/*.{html,css,js,mjs,map,jpg,png,gif,webp,ico,svg,woff2,woff,eot,ttf,otf,ttc,json}',
        ],
        runtimeCaching: [
            {
            urlPattern: /^.*\.(html|jpg|png|gif|webp|ico|svg|woff2|woff|eot|ttf|otf|ttc|json|css)$/,
            handler: `StaleWhileRevalidate`,
            },
            {
              urlPattern: /^https?:\/\/fonts\.googleapis\.com\/css/,
              handler: `StaleWhileRevalidate`,
            },
        ],
    };

    const genSW = await workbox.generateSW(options);
    const size = (genSW.size / 1048576).toFixed(2);
    console.log(`${genSW.count} files will be precached, totaling ${size} MB.`);

    console.log('Building tailwind');
    console.log(execSync("npm run build:tailwind").toString());
  });

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("fonts");
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy({ "root": "/" });
  eleventyConfig.addPassthroughCopy("admin-blog");

  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.io/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};
