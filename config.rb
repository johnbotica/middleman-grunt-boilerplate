# Environment vars
require "dotenv"
Dotenv.load


###
# Page options, layouts, aliases and proxies
###

# Tell Middleman where our assets are
set :css_dir,     "css"
set :js_dir,      "js"
set :images_dir,  "img"

# Tell Middleman to build into './www'
set :build_dir,   "www"

# Enable directory indexes
activate :directory_indexes

# Per-page layout changes:
#
# Pages with no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# If you need a page with an alternate layout
# page "/path/to/file.html", layout: :otherlayout

# General configuration

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Any actions on build go here like ignoring files
end

# After `middleman build` we will run our Grunt setup
after_build do |builder|
  print "Running Grunt...\n"
  system("grunt build")
  puts "done.\n"
end
