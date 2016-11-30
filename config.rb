# Environment vars
require "dotenv"
Dotenv.load

# Tell Middleman where our assets are
set :css_dir,     "css"
set :js_dir,      "js"
set :images_dir,  "img"

# Tell Middleman to build into './www'
set :build_dir,   "www"

# Enable directory indexes
activate :directory_indexes

# Prevent building of README.md files
ignore /README/

# Pages with no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# After `middleman build` we will run our Grunt setup
after_build do |builder|
  print "Running Grunt...\n"
  system("grunt build")
  puts "done.\n"
end

# Minify the HTML output
activate :minify_html do |html|
  html.remove_quotes = false
  html.remove_link_attributes = false
  html.remove_input_attributes = false
end
