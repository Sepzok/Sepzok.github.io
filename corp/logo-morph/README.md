# Corp logo morph (vendored)

Shipping copy of the Sepzok wordmark → icon animation for the institutional site hero.

**Source of truth:** `pocket-ops/promo/logo-morph/` (+ `pocket-ops/intl-site/favicon.svg`).

Do not edit these modules here first. Change ops, then:

```sh
# from pocket-ops
bash scripts/sync-corp-logo-morph.sh
```

Commit `corp/logo-morph/` and `corp/favicon.svg` with the site, then publish CN (`site:publish:corp`) and EN (`publish-corp-cloudflare.sh`).
