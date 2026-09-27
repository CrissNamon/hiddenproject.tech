# Hidden Project

Static site for [hiddenproject.tech](https://hiddenproject.tech/), the studio page for Danila Rassokhin. Games and apps in development, published on Google Play. The App Store is planned.

No build step. The site is plain HTML, CSS, and one small script.

## GitHub Pages

The repository is ready for Pages from the `main` branch, root folder.

1. Open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set the branch to **main** and the folder to **/ (root)**. Save.
4. Under **Custom domain**, enter `hiddenproject.tech`. The `CNAME` file in the repo already says the same thing.
5. After DNS is in place, turn on **Enforce HTTPS**.

The site will also answer at `https://crissnamon.github.io/hiddenproject.tech/` until the custom domain is verified. Links and images use relative paths, so that address works too.

## DNS

At the registrar for `hiddenproject.tech`, point the apex domain at GitHub Pages:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |

Optional `www` record:

| Type | Host | Value |
| --- | --- | --- |
| CNAME | `www` | `crissnamon.github.io` |

If the registrar supports ALIAS or ANAME, those can stand in for the apex A records. Remove any old A, AAAA, or CNAME records on `@` that point somewhere else.

## Titles

The Tower and Book Tracker are working titles. **The Jar** is a placeholder for the merge game (fungus, seeds, and eggs) until a real name is chosen. Rename it in `index.html`. The social image at `assets/og.png` still says The Jar.

## Contact

danilarassokhin@gmail.com
