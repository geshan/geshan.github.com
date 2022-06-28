# Geshan's Blog on Eleventy

Moved from octopress to Eleventy.

## Docker

To run locally just run `docker-compose up` then visit `http://localhost:8080`

## Run

To run without docker, make sure you have node installed, then run `npx eleventy --serve` and hit `https://localhost:8080`

## Local refresh command

Run this:

```
rm -rf _site && ELEVENTY_ENV=production npx eleventy --serve
```

