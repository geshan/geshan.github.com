#!/usr/bin/env node

/**
 * Blog Topic Suggestion Tool
 * Analyzes existing blog posts and suggests topics for the next post
 */

const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, 'posts');

// Read all markdown files from the posts directory
function getAllPosts() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(file => file.endsWith('.md'))
    .sort()
    .reverse(); // Most recent first
  
  return files.map(file => {
    const content = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
    return parsePost(file, content);
  });
}

// Parse front matter from a blog post
function parsePost(filename, content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontMatterRegex);
  
  if (!match) return { filename, title: '', tags: [], date: null };
  
  const frontMatter = match[1];
  const lines = frontMatter.split('\n');
  
  let title = '';
  let tags = [];
  let date = null;
  let inTags = false;
  
  for (const line of lines) {
    if (line.startsWith('title:')) {
      title = line.replace('title:', '').trim().replace(/^["']|["']$/g, '');
    } else if (line.startsWith('date:')) {
      date = line.replace('date:', '').trim();
    } else if (line.startsWith('tags:')) {
      inTags = true;
    } else if (inTags && line.startsWith('- ')) {
      tags.push(line.replace('- ', '').trim());
    } else if (inTags && !line.startsWith(' ')) {
      inTags = false;
    }
  }
  
  return { filename, title, tags, date };
}

// Analyze posts and generate insights
function analyzePosts(posts) {
  const recentPosts = posts.slice(0, 20);
  const allTags = {};
  const recentTags = {};
  const tagsByYear = {};
  
  posts.forEach(post => {
    const year = post.filename.substring(0, 4);
    
    post.tags.forEach(tag => {
      allTags[tag] = (allTags[tag] || 0) + 1;
      
      if (!tagsByYear[year]) tagsByYear[year] = {};
      tagsByYear[year][tag] = (tagsByYear[year][tag] || 0) + 1;
    });
  });
  
  recentPosts.forEach(post => {
    post.tags.forEach(tag => {
      recentTags[tag] = (recentTags[tag] || 0) + 1;
    });
  });
  
  return { recentPosts, allTags, recentTags, tagsByYear };
}

// Generate topic suggestions
function generateSuggestions(analysis) {
  const suggestions = [];
  
  // 1. Trending topics (appeared recently but not too frequently)
  const trendingTopics = Object.entries(analysis.recentTags)
    .filter(([tag, count]) => count >= 3 && count <= 8)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);
  
  if (trendingTopics.length > 0) {
    suggestions.push({
      category: '🔥 Continue Trending Topics',
      reason: 'These topics have strong momentum in your recent posts',
      topics: trendingTopics.map(tag => `Continue the ${tag} series or explore advanced ${tag} topics`)
    });
  }
  
  // 2. Evergreen topics that haven't been covered recently
  const evergreen = ['Node.js', 'Javascript', 'Docker', 'Software Engineering', 'Web Development'];
  const underrepresentedEvergreen = evergreen.filter(tag => 
    (analysis.allTags[tag] || 0) > 10 && (analysis.recentTags[tag] || 0) < 3
  );
  
  if (underrepresentedEvergreen.length > 0) {
    suggestions.push({
      category: '🌲 Evergreen Topics Needing Refresh',
      reason: 'These core topics are popular but haven\'t been covered recently',
      topics: underrepresentedEvergreen.map(tag => `Fresh take on ${tag}: new patterns, tools, or best practices`)
    });
  }
  
  // 3. Combination opportunities
  const recentTopTags = Object.entries(analysis.recentTags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag]) => tag);
  
  if (recentTopTags.length >= 2) {
    const combinations = [];
    for (let i = 0; i < recentTopTags.length - 1; i++) {
      for (let j = i + 1; j < Math.min(i + 3, recentTopTags.length); j++) {
        combinations.push(`${recentTopTags[i]} + ${recentTopTags[j]}`);
      }
    }
    
    suggestions.push({
      category: '🔗 Combination Topics',
      reason: 'Combine your recent focus areas for unique insights',
      topics: combinations.slice(0, 5).map(combo => `How to use ${combo} together`)
    });
  }
  
  // 4. Series completion or expansion
  const recentPostTitles = analysis.recentPosts.slice(0, 10).map(p => p.title);
  const partPattern = /\[?[Pp]art\s+\d+\]?/;
  const seriesPosts = recentPostTitles.filter(title => partPattern.test(title));
  
  if (seriesPosts.length > 0) {
    suggestions.push({
      category: '📚 Series Expansion',
      reason: 'You have active series that readers might want continued',
      topics: [
        'Continue your Ollama series (you have 4 parts already)',
        'Expand your AWS series (ECR and ECS coverage)',
        'Create a comprehensive Google AI Studio series'
      ]
    });
  }
  
  // 5. Practical tutorials
  suggestions.push({
    category: '🛠️ Practical Tutorial Ideas',
    reason: 'Based on your successful tutorial-style posts',
    topics: [
      'How to build a full-stack AI application with Gemini and Node.js',
      'Deploying LLMs to production: A complete guide',
      'Building a CI/CD pipeline for containerized applications',
      'Creating a real-time chat application with WebSockets and Node.js',
      'How to implement feature flags in a Node.js microservices architecture'
    ]
  });
  
  // 6. Career and soft skills
  const careerTags = ['Jobs', 'Software Engineering'];
  const hasRecentCareerPost = analysis.recentPosts.slice(0, 10)
    .some(p => p.tags.some(t => careerTags.includes(t)));
  
  if (!hasRecentCareerPost) {
    suggestions.push({
      category: '👔 Career & Professional Development',
      reason: 'Balance technical content with career advice',
      topics: [
        'How to transition from backend to full-stack development',
        'Building a technical portfolio that gets you hired',
        'Navigating your first year as a senior engineer',
        'How to mentor junior developers effectively',
        'Remote work best practices for distributed teams'
      ]
    });
  }
  
  // 7. Emerging tech
  suggestions.push({
    category: '🚀 Emerging Technologies',
    reason: 'Stay ahead with cutting-edge topics',
    topics: [
      'Getting started with Anthropic Claude via Model Context Protocol (MCP)',
      'Building agents with LangChain and Node.js',
      'Exploring Bun: The faster JavaScript runtime',
      'Introduction to WebAssembly for Node.js developers',
      'Using GitHub Copilot Workspace for complex coding tasks'
    ]
  });
  
  return suggestions;
}

// Display suggestions
function displaySuggestions(suggestions, recentPosts) {
  console.log('\n╔════════════════════════════════════════════════════════════════╗');
  console.log('║           BLOG TOPIC SUGGESTIONS FOR YOUR NEXT POST           ║');
  console.log('╚════════════════════════════════════════════════════════════════╝\n');
  
  console.log('📊 Recent Posts Analysis:');
  console.log('─────────────────────────────────────────────────────────────────');
  console.log(`Total posts analyzed: ${recentPosts.length}`);
  console.log(`\nYour last 5 posts:`);
  recentPosts.slice(0, 5).forEach((post, i) => {
    console.log(`  ${i + 1}. ${post.title}`);
    console.log(`     Tags: ${post.tags.join(', ')}`);
  });
  
  console.log('\n\n💡 TOPIC SUGGESTIONS:');
  console.log('═════════════════════════════════════════════════════════════════\n');
  
  suggestions.forEach((suggestion, index) => {
    console.log(`${index + 1}. ${suggestion.category}`);
    console.log(`   ${suggestion.reason}\n`);
    suggestion.topics.forEach(topic => {
      console.log(`   • ${topic}`);
    });
    console.log('');
  });
  
  console.log('─────────────────────────────────────────────────────────────────');
  console.log('💭 Final Thoughts:');
  console.log('   • Your recent focus on AI/Gen AI and Cloud platforms is strong');
  console.log('   • Consider balancing with some Node.js/JavaScript fundamentals');
  console.log('   • Tutorial-style posts with step-by-step guides perform well');
  console.log('   • Series posts create anticipation and reader engagement');
  console.log('─────────────────────────────────────────────────────────────────\n');
}

// Main execution
function main() {
  console.log('Analyzing blog posts...\n');
  
  const posts = getAllPosts();
  const analysis = analyzePosts(posts);
  const suggestions = generateSuggestions(analysis);
  
  displaySuggestions(suggestions, posts);
  
  // Additional statistics
  console.log('📈 Top 10 Tags Across All Posts:');
  console.log('─────────────────────────────────────────────────────────────────');
  Object.entries(analysis.allTags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([tag, count], i) => {
      console.log(`  ${i + 1}. ${tag.padEnd(25)} ${count} posts`);
    });
  
  console.log('\n📅 Recent Trends (Last 20 Posts):');
  console.log('─────────────────────────────────────────────────────────────────');
  Object.entries(analysis.recentTags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .forEach(([tag, count], i) => {
      console.log(`  ${i + 1}. ${tag.padEnd(25)} ${count} posts`);
    });
  
  console.log('\n');
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { getAllPosts, analyzePosts, generateSuggestions };
