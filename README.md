# JoyLabs Software Studio

Static service catalog built with Astro and Tailwind CSS. Astro generates files in `dist/`; Wasmer's `Staticfile` and `wasmer.toml` serve that directory.

## Configure business details

Copy `.env.example` to `.env` and set the public values before building:

- `PUBLIC_WHATSAPP_NUMBER`: international digits only, for example `6281234567890` (without `+` or spaces). Enables WhatsApp links and the validated contact form.
- `PUBLIC_EMAIL_ADDRESS`: displayed as the email contact and used for `mailto:` links.
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

Set up Wasmer CLI and log in, then run `npm run build` followed by `wasmer deploy` from this directory. The included `Staticfile` points Wasmer's static web server at `dist/`; `wasmer.toml` maps the same build directory. Configure environment values before building so the static output contains your public contact configuration. Add the actual deployed origin as `PUBLIC_SITE_URL`, rebuild, and redeploy when the final Wasmer domain is known.
