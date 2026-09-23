# JoyLabs Software Studio

Static service catalog built with Astro and Tailwind CSS. Astro generates files in `dist/`; Wasmer's `Staticfile` and `wasmer.toml` serve that directory.

## Configure business details

Public contact details currently live in [`src/data/site-config.ts`](src/data/site-config.ts) so they are reliably included in Wasmer's static build. Update that file to change the WhatsApp number or email address.

TODO: Move these values back to Wasmer Build environment variables after confirming that Wasmer passes them into the Astro build. These details are public contact information, not secrets.

Other optional public values can be set in `.env` for local builds. The WhatsApp and email entries in `.env.example` are reserved for the future migration noted above; the site currently reads those two details from `src/data/site-config.ts`.

- `PUBLIC_MIDTRANS_PAYMENT_LINK`: optional real Midtrans-hosted Payment Link. The site keeps the payment action informational while this is empty.
- `PUBLIC_BUSINESS_ADDRESS`: defaults to West Jakarta, DKI Jakarta.
- `PUBLIC_SITE_URL`: the final deployed origin, such as `https://your-real-app.wasmer.app`; used for canonical and Open Graph URL metadata.
- `PUBLIC_INSTAGRAM_URL` and `PUBLIC_LINKEDIN_URL`: optional social links reserved for future use.

Public Astro environment variables are included in the generated browser output. Only use these for public business contact details and links, never secrets or Midtrans credentials.

## Local development

```sh
npm install
npm run dev
```

## Build and preview

```sh
npm run check
npm run build
npm run preview
```

The generated static website is in `dist/`. When `PUBLIC_SITE_URL` is set, the build also writes a sitemap containing the home, privacy, and terms pages and adds its location to `robots.txt`.

## Wasmer

Set up Wasmer CLI and log in, then run `npm run build` followed by `wasmer deploy` from this directory. The included `Staticfile` points Wasmer's static web server at `dist/`; `wasmer.toml` maps the same build directory.

Astro renders this site as static HTML, so `PUBLIC_*` values are read while the site is built. Wasmer Build variables must be available during that build; Runtime-only values are not available to the static page in the browser. The email and WhatsApp currently use `src/data/site-config.ts` because they were missing from the deployed HTML even after enabling Build variables.

The Wasmer dashboard variables are used by a Wasmer-managed source/Git build. If you deploy a local checkout with `wasmer deploy`, first put the values in your local, untracked `.env`, then run `npm run build` and `wasmer deploy`; dashboard variables do not get passed back into the build running on your computer. After changing dashboard build variables, use **Save and Redeploy** and verify the deployment completed successfully. The location label may still show without any environment variable because the site intentionally falls back to `West Jakarta, DKI Jakarta` when `PUBLIC_BUSINESS_ADDRESS` is empty.

Add the actual deployed origin as `PUBLIC_SITE_URL`, enable it for the build, and redeploy so canonical metadata and the sitemap use the real Wasmer domain.
