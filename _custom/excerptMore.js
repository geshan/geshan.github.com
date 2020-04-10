module.exports = function(post) {
  let excerpt = post.data.excerpt ? `<p>${post.data.excerpt}</p>` : "";
  const postContent = post.templateContent;

  let startPosition = 0;
  let endPosition = postContent.toLowerCase().indexOf('<!-- more -->');
  if (endPosition == -1) {
    return postContent.replace(/(<([^>]+)>)/ig,"").substring(0, 300) + '...';
  }
  if (startPosition !== -1 && endPosition !== -1) {
      excerpt = postContent.substring(startPosition, endPosition);
  } else if (!post.data.excerpt) {
      let startPosition = postContent.toLowerCase().indexOf('<p>');
      let endPosition = postContent.toLowerCase().indexOf('</p>');
      
      excerpt = postContent.substring(startPosition + 3, endPosition);
  }
  return excerpt;
};
