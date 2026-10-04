# Google Analytics integration

The site sends manual GA4 page views for its HashRouter routes and the seven known gallery rooms. It runs only in production over HTTPS on valeandco.com.au or www.valeandco.com.au. Missing or invalid measurement IDs disable the integration.

## Release configuration

1. Create the Vale&Co. Styling property in the business Google account, using Sydney time and AUD.
2. Create a web data stream for https://valeandco.com.au and obtain its actual G-prefixed measurement ID.
3. Disable Enhanced Measurement on that stream. In particular, browser-history page views must be off because the application sends route views itself. Keep automatic form collection off.
4. Set `VITE_GA_MEASUREMENT_ID` in `.env.production` before building. The measurement ID is public; account passwords must never be added to the repository.
5. Run `npm run build`, obtain approval of the specific release PR, and publish that build through the existing GitHub Pages release process.
6. Verify an actual homepage visit and a gallery room change in GA Realtime. Local development visits are deliberately excluded.

Account creation is currently awaiting authorization to accept Google's service and data-processing terms. No real measurement ID has been configured yet, and no live collection has been verified.

## Collection controls

- Send canonical route and allowed room names, without unrelated query strings or enquiry form values.
- Disable advertising storage, personalisation and Google signals.
- Respect browser Do Not Track and the saved opt-out on the `/analytics` page.
- Opting out removes first-party GA cookies for the current and parent domain.

Validation covered duplicate suppression, room changes, query filtering, production/domain/ID guards, Do Not Track, blocked storage, opt-out, cookie removal and re-enabling in a simulated environment without sending requests to Google.
