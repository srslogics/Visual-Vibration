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

Create a **Web Service** from the repository and use:

- Root Directory: `visual-vibrations-loyalty-crm`
- Runtime: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

The service uses Render's assigned `PORT` automatically.
