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
    const contentBody = content.match(/<div\s+class="entry-content clearfix mt-5">[\S\s]*?<\/div>/gi);
    return contentBody[0].replace(/(<([^>]+)>)/ig,"")
            .replace('"', '').replace(/\n/g,' ').trim().substring(0, 142) + '...';
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
