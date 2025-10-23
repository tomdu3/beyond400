# Beyond 400 Blog 

Special thanks to [fuwari](https://github.com/fuwari) for the original template: astatic blog template built with [Astro](https://astro.build).

[**🖥️ Beyond 400 (Vercel)**](https://beyond400.vercel.app/)&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
nbsp;&nbsp;


> README version: `2024-09-10`

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ Features

- [x] Built with [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com)
- [x] Smooth animations and page transitions
- [x] Light / dark mode
- [x] Customizable theme colors & banner
- [x] Responsive design
- [ ] Comments
- [x] Search
- [ ] TOC

## 🚀 How to Use

1. [Generate a new repository](https://github.com/saicaca/fuwari/generate) from this template or fork this repository.
2. To edit your blog locally, clone your repository, run `pnpm install` AND `pnpm add sharp` to install dependencies.
   - Install [pnpm](https://pnpm.io) `npm install -g pnpm` if you haven't.
3. Edit the config file `src/config.ts` to customize your blog.
4. Run `pnpm new-post <filename>` to create a new post and edit it in `src/content/posts/`.
5. Deploy your blog to Vercel, Netlify, GitHub Pages, etc. following [the guides](https://docs.astro.build/en/guides/deploy/). You need to edit the site configuration in `astro.config.mjs` before deployment.

## ⚙️ Frontmatter of Posts

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
category: Front-end
draft: false
lang: hr      # Set only if the post's language differs from the site's language in `config.ts`
---
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                             | Action                                           |
|:------------------------------------|:-------------------------------------------------|
| `pnpm install` AND `pnpm add sharp` | Installs dependencies                            |
| `pnpm dev`                          | Starts local dev server at `localhost:4321`      |
| `pnpm build`                        | Build your production site to `./dist/`          |
| `pnpm preview`                      | Preview your build locally, before deploying     |
| `pnpm new-post <filename>`          | Create a new post                                |
| `pnpm astro ...`                    | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro --help`                 | Get help using the Astro CLI                     |

## KNOWN ISSUES/BUGS

### Build Failures (Fixed)

- **`npm run build` failed due to two issues:**
    1.  **Deprecated auto-generation of collections:** A `spec` collection was being auto-generated, which is a deprecated feature. This was fixed by explicitly defining the `spec` collection in `src/content/config.ts`.
    2.  **Undefined CSS class:** The CSS class `link` was being used in `src/styles/markdown.css` but was not defined, causing a PostCSS error. This was fixed by removing the undefined `link` class.
    3.  **Missing frontmatter:** After defining the `spec` collection, the build failed again because `src/content/spec/about.md` was missing the required `title` and `published` fields in its frontmatter. This was fixed by adding the required frontmatter to the file.

### Vercel Deployment Failure (Fixed)

- **`pnpm install` failed during Vercel deployment:**
    - **Problem:** The build process was failing with a "Host key verification failed" error. This was because a transitive dependency, `@emmetio/css-parser`, was being fetched from a forked GitHub repository using an SSH URL (`git@github.com:...`) instead of from the npm registry. Vercel's build environment doesn't have the necessary SSH keys to access the private repository, causing the installation to fail.
    - **Fix:** The issue was resolved by adding a `pnpm.overrides` section to the `package.json` file. This forces `pnpm` to use the official `@emmetio/css-parser` package from the npm registry (version `0.4.0`) instead of the problematic git URL. After updating `package.json`, running `pnpm install` updated the `pnpm-lock.yaml` to reflect this change.