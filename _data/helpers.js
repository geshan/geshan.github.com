function wordCount(s) {
	return s.split(/\s+/).length;
}

module.exports = {
  getReadingTime(text) {
    const wordsPerMinute = 250;
    const numberOfWords = text.split(/\s/g).length;
    return Math.ceil(numberOfWords / wordsPerMinute);
  },
  debug(obj) {
    console.log(obj);
    return JSON.stringify(obj, null, 2);
  },
  getEnv() {
    return process.env.ELEVENTY_ENV || 'production';
  },
  getMetaDescription(content) {
    if (!content) return '';
    
    // Try to find the entry-content div first (for newer posts)
    let contentBody = content.match(/<div\s+class="entry-content clearfix mt-5">[\S\s]*?<\/div>/gi);
    
    // If not found, try to find any div with class containing "entry-content" or "post"
    if (!contentBody) {
      contentBody = content.match(/<div[^>]*class="[^"]*entry-content[^"]*">[\S\s]*?<\/div>/gi);
    }
    
    // If still not found, try to extract from post div or first paragraph
    if (!contentBody) {
      contentBody = content.match(/<div[^>]*class="[^"]*post[^"]*">[\S\s]*?<\/div>/gi);
    }
    
    // Last resort: extract from first paragraph
    if (!contentBody) {
      contentBody = content.match(/<p[^>]*>[\S\s]*?<\/p>/i);
    }
    
    // If still nothing, strip HTML from entire content
    let text = '';
    if (contentBody && contentBody[0]) {
      text = contentBody[0];
    } else {
      text = content;
    }
    
    // Strip HTML tags and clean up
    text = text.replace(/(<([^>]+)>)/ig, "")
               .replace(/"/g, '')
               .replace(/\n/g, ' ')
               .replace(/\s+/g, ' ')
               .trim();
    
    // Return truncated description or empty string
    if (!text) return '';
    return text.length > 142 ? text.substring(0, 142) + '...' : text;
  },
  getStats(posts) {
    //from - https://www.stackbit.com/blog/content-stats-eleventy/
    const totalPosts = posts.length;
    let totalWords = 0;
    let tags = {};
    let categories = {};
    let years = {};
    let months = [];
    let days = [];

    posts.forEach((p,i) => {
      if(i === 0) firstPost = p;
      if(i === posts.length-1) lastPost = p;
      
      p.data.tags.forEach(t => {
        if(!tags[t]) tags[t] = 0;
        tags[t]++;
      });
      p.wordCount = wordCount(p.templateContent);
      
      //Add to the yearly stat
      let year = new Date(p.date).getFullYear();
      if(!years[year]) years[year] = 0;
      years[year]++;
      let month = new Date(p.date).getMonth();
      if(!months[month]) months[month] = 0;
      months[month]++;
      let dow = new Date(p.date).getDay();
      if(!days[dow]) days[dow] = 0;
      days[dow]++;
      totalWords += wordCount(p.templateContent);
    });
    let avgWords = totalWords / totalPosts;
    const mnths = {};
    for (const [index, month] of months.entries()) {
      mnths[index+1] = month;
    }
    return {
      totalPosts,
      totalWords,
      avgWords,
      "firstPost": {
        "title": firstPost.data.title,
        "date": firstPost.date,
        "wordCount": firstPost.wordCount
      },
      "lastPost": {
        "title": lastPost.data.title,
        "date": lastPost.date,
        "wordCount": lastPost.wordCount
      },
      "tags": tags,
      "categories": categories,
      "years": years,
      "months": mnths,
      "days": days
    };
  }
};
