/**
 * Public business contact details embedded in the static site at build time.
 *
 * TODO: Move these values back to PUBLIC_* build variables once Wasmer's build
 * environment reliably passes them into the Astro build.
 */
export const siteConfig = {
  whatsappNumber: '081770888654',
  emailAddress: 'hello.joylabs@gmail.com',
} as const;
