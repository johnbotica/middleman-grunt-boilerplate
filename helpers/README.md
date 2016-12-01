# Template Helpers

In addition to [Middleman's built-in helpers](https://middlemanapp.com/basics/helper_methods/) various custom helpers have been added to this project.

## [Asset Helpers](./asset_helpers.rb)

#### `asset_host`

The host where assets are hosted when Middleman is building. Reads the environment variable `ASSET_HOST` if it is present. During local development, this defaults to `localhost:5678`.

#### `asset_url`

**Arguments:**

Name | Type | Description
---- | ---- | -----------
`filename` | String | The root-relative path to the asset (e.g. `/img/brands/mindflash.svg`)

The schema agnostic fully-qualified URL of the asset. When `asset_host` is empty (i.e. during build when no `ASSET_HOST` environment variable is set) this will return the path instead of a fully-qualified URL.

#### `base64_svg`

**Arguments:**

Name | Type | Description
---- | ---- | -----------
`filename` | String | The `img` folder relative path to the SVG file (e.g. `brands/mindflash.svg`)
`options` | Hash | Optional hash of options for the SVG output. See `embedded_svg` documentation for which options are available.

Base64 encoded string of the SVG file specified.

#### `embedded_svg`

**Arguments:**

Name | Type | Description
---- | ---- | -----------
`filename` | String | The `img` folder relative path to the SVG file (e.g. `brands/mindflash.svg`)
`options` | Hash | Optional hash of options for the SVG output.

**Options:**

Name | Type | Description
---- | ---- | -----------
`width` | String/Integer | The width of the SVG with units (`px` or `%`) specified as a `String`. Also takes an `Integer` which assumes a unit of `px`
`height` | String/Integer | The height of the SVG with units (`px` or `%`) specified as a `String`. Also takes an `Integer` which assumes a unit of `px`
`id` | String | The `id` attribute of the SVG tag
`class` | String | The `class` attribute of the SVG tag
`preserveAspectRatio` | String | The `preserveAspectRatio` attribute of the SVG tag

#### `lazy_img`

**Arguments:**

Name | Type | Description
---- | ---- | -----------
`src` | String | The image file to be loaded. Can be specified as a root-relative path to the asset or a fully-qualified URL
`options` | Hash | Optional has of options for the image output.

**Options:**

Name | Type | Description
---- | ---- | -----------
`width` | String/Integer | The width of the SVG with units (`px` or `%`) specified as a `String`. Also takes an `Integer` which assumes a unit of `px`. If a width is specified a `max-width` style will also be written for reliable responsive scaling.
`height` | String/Integer | The height of the SVG with units (`px` or `%`) specified as a `String`. Also takes an `Integer` which assumes a unit of `px`
`id` | String | The `id` attribute of the SVG tag
`class` | String | The `class` attribute of the SVG tag

Generates an image tag that is prepped for lazy loading via the [jQuery Unveil](http://luis-almeida.github.io/unveil/) library. The `src` for the `img` tag output will be a Base64 encoded empty GIF and the `src` argument will be set as the `data-src` attribute for Unveil to read. You can specify a `data-src-retina` option to take advantage of the retina image replacement feature of Unveil. A `noscript` tag is also generated containing an `img` tag for the non-scaled version of the image.

## [Blog Helpers](./blog_helpers.rb)

#### `current_blog`

Returns the name of the current blog being viewed.

#### `next_articles`

**Arguments:**

Name | Type | Description
---- | ---- | -----------
`blog_name` | String | The `name` of the Middleman blog
`article` | Object | Middleman Blog Article object to base which articles will be selected next
`limit` | Integer | The amount of articles to receive next. Defaults to `3`
`wrap_around` | Boolean | Whether to wrap around from the end of the articles to the beginning if the next articles to be displayed are less than the amount available in the articles list.

Returns an array of "next" articles for a Middleman blog. Expects an article to be passed in to it so it knows which ones are "next". Can "wrap around" to the beginning of the article list if the amount of articles left in the article list are less than the desired `limit`. For example, if the article you are passing is the second to last article and `3` articles are requested, the last article and the first two articles will be returned, in that order.

## [Meta Helpers](./meta_helpers.rb)

#### `full_title`

**Arguments:**

Name | Type | Description
---- | ---- | -----------
`string` | String | The string to pre-pend to the page title

The "full" page title for the `<title>` tag. If no `string` value is specified, it defaults to `"Online Training Software | LMS by Mindflash"`. Otherwise the value will be a concatenation of the `string` value and `" | LMS by Mindflash"`.

#### `uniq_id`

A uniquely generated ID using `SecureRandom.hex`
