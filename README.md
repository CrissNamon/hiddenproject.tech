Static site for hiddenproject.tech, built by GitHub Pages with Jekyll on every push to `main`.

## Layout

- `_layouts/default.html`: the header, footer and meta tags shared by every page.
- `_data/games.yml`: every game, with its store links, screenshots and facts. The main page and the game pages are drawn from it.
- `<game>/index.html`: a game page. It only names the game; `_layouts/game.html` draws it.
- `_posts/`: blog posts, drawn by `_layouts/post.html`. The blog index is `blog/index.html`, and the feed is `blog/feed.xml`.
- `sitemap.xml`: lists the game pages, privacy policies and posts on its own.

Pages without front matter (the ad landings in `<game>/google-play/`, the game privacy policies) are copied as they are.

## A new post

Add `_posts/YYYY-MM-DD-short-title.md`. It is served at `/blog/short-title/`:

```markdown
---
title: The title
seo_title: "The title in search results"  # optional: the game's name and genre, up to about 60 characters
description: One or two sentences for the blog list, the feed and link previews. Up to about 160 characters.
game: the-outer-darkness   # optional: links the post to a game page and uses its colour and art
image: /assets/og.png      # optional: the link preview image (defaults to the game's feature graphic)
image_alt: What the image shows  # optional, with image
---

The post, in Markdown.
```

A post dated in the future is left out of the build. It appears with the first push after that date.

## A new game

Add an entry to `_data/games.yml`, then a folder with an `index.html` that holds only:

```yaml
---
layout: game
game: the-slug
---
```
