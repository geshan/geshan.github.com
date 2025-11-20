# Blog Topic Suggestion Tool

This tool analyzes your existing blog posts and provides data-driven suggestions for your next blog post topic.

## Usage

Run the topic suggestion tool:

```bash
npm run suggest-topic
```

Or directly:

```bash
node suggest-topic.js
```

## What It Analyzes

The tool examines your blog post history and provides insights on:

1. **Trending Topics** - Topics with recent momentum that readers are engaged with
2. **Evergreen Topics** - Core topics that are popular but haven't been covered recently
3. **Combination Opportunities** - Unique angles by combining your focus areas
4. **Series Expansion** - Suggestions to continue or expand existing series
5. **Practical Tutorials** - Hands-on tutorial ideas based on your successful posts
6. **Career Development** - Professional growth topics to balance technical content
7. **Emerging Technologies** - Cutting-edge topics to stay ahead of trends

## Output

The tool provides:

- Analysis of your recent posts
- Category-based topic suggestions
- Tag statistics across all posts
- Recent trend analysis
- Personalized recommendations based on your writing patterns

## How It Works

1. Scans all markdown files in the `posts/` directory
2. Parses front matter (title, tags, date) from each post
3. Analyzes patterns, frequency, and trends
4. Generates contextual suggestions based on multiple factors
5. Presents organized, actionable recommendations

## Current Analysis Results

Based on your latest posts (as of November 2025), here are the top recommendations:

### Strong Trending Areas
- **AI/Gen AI** - 11 posts in recent 20 (55% of recent content)
- **GCP & Google Cloud Run** - Strong focus with 7 GCP posts
- **Ollama** - Active 4-part series showing strong reader interest

### Gaps to Consider
- **Node.js** - 39 total posts but only 3 in recent 20 (needs refresh)
- **Docker** - 27 total posts but underrepresented recently
- **Software Engineering practices** - Core topic needing fresh content

### Recommended Next Topics

1. **Continue the Ollama momentum** - Part 5: Production deployment, scaling, or monitoring
2. **Bridge AI with Node.js** - "Building a Full-stack AI Application with Gemini and Node.js"
3. **Practical Docker + AI** - "Deploying LLMs with Docker and Cloud Run: Best Practices"
4. **Career Development** - "How to Stay Relevant as AI Tools Transform Software Engineering"
5. **Emerging Tech** - "Getting Started with MCP Servers: Beyond GitHub"

## Customization

Edit `suggest-topic.js` to:
- Adjust the weight of different factors
- Add new suggestion categories
- Modify the analysis window (currently last 20 posts)
- Customize output formatting

## Notes

- The tool is read-only and doesn't modify any files
- Suggestions are based on patterns, not rules - use your judgment
- Consider your personal interests and current events when choosing topics
- Series posts tend to build anticipation and improve engagement
