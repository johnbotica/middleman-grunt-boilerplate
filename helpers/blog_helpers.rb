module BlogHelpers
  def next_articles(blog_name, article, limit = 3, wrap_around = true)
    articles = blog(blog_name).articles
    article_index = articles.find_index(article)

    # Get the next n number of articles after article
    filtered = articles[(article_index + 1)..(article_index + limit)]

    # If the limit was not achieved get some from the front of the set
    if wrap_around && filtered.length < limit
      filtered = filtered + articles[0..(limit - filtered.length)]
    end

    # Only return those in the set not the article and within the limit
    filtered.select{|filter| filter != article}[0..limit]
  end
end
