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

    return {
      totalPosts,
      totalWords,
      avgWords,
      "firstPost": {
        "title": firstPost.data.title,
        "date": firstPost.date
      },
      "lastPost": {
        "title": lastPost.data.title,
        "date": lastPost.date
      },
      "tags": JSON.stringify(tags),
      "categories": JSON.stringify(categories),
      "years": JSON.stringify(years),
      "months": JSON.stringify(months),
      "days": JSON.stringify(days)
    };
  }
};
