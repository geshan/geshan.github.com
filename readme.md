# Geshan's Blog on Eleventy

Moved from Octopress to Eleventy. Hosted on Cloudflare pages.

## Blog Topic Suggestions

Need help deciding what to write about next? Run the topic suggestion tool:

```bash
npm run suggest-topic
```

This analyzes your blog post history and provides data-driven recommendations based on:
- Recent trending topics
- Coverage gaps in evergreen content
- Series expansion opportunities
- Combination of your expertise areas

See [NEXT_TOPIC.md](./NEXT_TOPIC.md) for current recommendations or [TOPIC_SUGGESTIONS.md](./TOPIC_SUGGESTIONS.md) for detailed documentation.

## Docker

To run locally just run `docker-compose up` then visit `http://localhost:8080`

## Run

To run without docker, make sure you have node installed, then run `npx eleventy --serve` and hit `https://localhost:8080`

## Local refresh command

Run this:

```
rm -rf _site && ELEVENTY_ENV=production npx eleventy --serve
```

## Do not clone this as a boilerplate

Please do not clone this repo as a boilerplate or starter for your own blog. This is not a stock theme or a boilerplate Eleventy blog. I have made this open source just to keep things open not to be copied and used as a base theme, so please DO NOT do it, thanks!
