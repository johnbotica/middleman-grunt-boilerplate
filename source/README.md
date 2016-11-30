# Source Files

This folder contains all the source files used for building your website. Folder structure:

Folder | Description
------ | -----------
[`css`](./css) | SASS files
[`fonts`](./fonts) | Locally hosted fonts
[`img`](./img) | Images and SVG files used throughout the site
[`js`](./js) | JavaScript files
[`layouts`](./layouts) | Layout files for templated designs
[`partials`](./partials) | ERB template partials
[`pdfs`](./pdfs) | PDFs used throughout the site
[`vendor`](./vendor) | 3rd party vendor libraries
[`videos`](./video) | Videos used throughout the site

## Global Frontmatter

Some frontmatter is available to all pages regardless of their template.

#### `page_title` (String)

The `<title>` of the page if you want to use something different here than the `title` frontmatter value

#### `priority` (String)

Override the default priority of `0.6` in the generated `sitemap.xml` file.

#### `changefreq` (String)

Override the default change frequency of `monthly` in the generated `sitemap.xml` file. Can be set to one of the following values: `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`. See the [sitemap.org protocol](http://www.sitemaps.org/protocol.html) for more information about this attribute.
