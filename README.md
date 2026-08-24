# Vantage — Referral Intelligence

A referral attribution, verification and partner-rewards product for **Visual Vibrations, Nagpur**.

## Product scope

- Referral registration for architects, interior designers and customer advocates
- Customer confirmation and three-point proof workflow
- Timestamped ownership and attribution status
- Duplicate, self-referral and project-overlap fraud controls
- Partner profiles with referral, conversion, revenue and points histories
- Configurable membership tiers and earning rules
- Tier-aware rewards catalogue and controlled redemptions
- Points liability, settlement and audit reporting
- Responsive desktop and mobile workspace
- Device-local persistence for newly created referral records and approvals

## Production integrations

Customer OTP/WhatsApp delivery, KYC, invoice/payment confirmation and durable shared storage require the selected production providers and credentials. The interface clearly separates those integration points from programme logic.

## Render deployment

Use a **Static Site**. The included `render.yaml` can configure it automatically as a Render Blueprint.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https%3A%2F%2Fgithub.com%2Fsrslogics%2Fstock-market-app)

- Repository: `https://github.com/srslogics/stock-market-app`
- Branch: `main`
- Root Directory: leave blank
- Build Command: `npm ci && npm run build`
- Publish Directory: `dist/client`

Every push to `main` triggers a new deployment. The `/partner` route is rewritten to the self-service partner application.
