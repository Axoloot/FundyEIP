# Project history

Fundy was the EPITECH Innovative Project (EIP) of the 2023 class at EPITECH Paris: a two-year team project, run in sprints and graded on both the product and its documentation. This page summarises that documentation (the Project Log Document, the technical documentation and the user guide, all written in French) and links it to the code in this repository.

## The idea

Most card payments are not round numbers. Fundy links to the user's bank account, rounds each card payment up to the next euro (or a step the user chooses), and puts the difference in a **piggy bank**. The user then gives that money to associations and crowdfunding projects listed on Fundy, or donates directly by card.

Three products came out of it:

- a **mobile app** and a **web app** for donors (sign up, link a bank, follow projects, donate, see where the money went);
- a **partner dashboard** where associations and project owners create their page and post the actions funded by donations;
- all backed by one **REST API**.

## Timeline

| When | Phase | What happened |
|---|---|---|
| Early 2021 | Forward (pre-EIP) | First mobile proof of concept: sign up, log in, favourite projects, simulated card donation. |
| Apr 2021 | Sprint 1 | New, cleaner PoC of the mobile app plus a first web app and backend. At follow-up the backend was almost done, mobile ~80 %, web ~60 %. |
| Jul – Sep 2021 | Sprint 2 | CI/CD set up, web mockups reworked, backend defects fixed. Goal: make the existing app stable and add the missing core features. Delivered at ~95 %. Security review of the stack and first technical documentation. |
| Nov 2021 | Sprint 3 | Bank integration chosen (see below), round-up transactions and linked accounts in the backend, web redesign started, first version of the partner dashboard. |
| Jan – Jun 2022 | Sprint 4 (beta) | Partner (B2B) authentication, API test suite, error handling with translation keys, CI/CD pipelines for every app, Jest and Cypress tests, dark mode, own domain and TLS certificates, production on DigitalOcean, beta with real users, logs with Grafana and Loki, user analytics, password reset. |
| Jun 2022 – Jan 2023 | Sprint 5 (consolidation) | v3 interface on web and mobile with a shared UI component library, responsive web app, translations (FR / EN / ES), card donations from web and mobile, association action feed, partner dashboard completed, hosting moved to Microsoft Azure to cut costs. |

## Key technical decisions

**Open banking: Plaid → Nordigen.** Plaid was the first choice for reading users' transactions, but it did not support the major French banks, which would have blocked the beta. The team switched to **Nordigen** (now GoCardless Bank Account Data), which covers most French banks. → `backend/src/services/nordigen/`

**Charging the round-ups: Stripe.** Nordigen gives read access and the account's IBAN; **Stripe** debits the rounded-up amount from that IBAN (SEPA). The piggy bank balance itself is kept by Fundy rather than held by a payment provider. → `backend/src/services/stripe/`

**A cron job for round-ups.** Every minute the backend checks the active bank accounts for new card transactions, computes the round-ups and creates the matching transactions and charges. → `backend/src/transactionsCron.ts`

**Cookie sessions, not tokens.** All clients authenticate with a session cookie stored in Redis, with separate flows for donors and partners. → `backend/src/middlewares/`

**Hosting: DigitalOcean → Azure.** Production started as Docker Compose on a DigitalOcean droplet: the API, PostgreSQL, Redis and the monitoring stack in containers, the front-ends as static files, and nginx as reverse proxy for one subdomain per app. Moving to a real domain with Certbot TLS certificates fixed the cross-origin cookie (CORS) problems of the early setup. To lower costs the whole setup was later moved to **Microsoft Azure**. The mobile app shipped through **Expo** (Expo Go for the beta, EAS builds for TestFlight). → `infra/nginx/`, `backend/docker-compose.yaml`

**Observability.** Prometheus metrics on the API, logs shipped with Promtail to Loki, and Grafana dashboards. → `backend/src/logger.ts`, `backend/promtail-config.yaml`

**Quality.** Integration tests for the API (Jest and supertest against a real database), Jest tests on mobile, end-to-end tests with Cypress on web, ESLint run on pre-commit, a shared commit convention, and CI running the tests on every push.

## How the team worked

- Five sprints, each with a **kick-off**, one or two **follow-ups** and a **delivery** reviewed by EPITECH, tracked in a Project Log Document (deliverables map, user stories with estimates in person-days, individual progress reports).
- Discord for communication, Airtable and Miro for agile planning, a shared Google Drive for documents, GitHub for code (one repository per app, merged into this monorepo for the portfolio).
- One technical owner per app, with pairing when people joined or changed areas. See the [Team section](../README.md#team) for who did what.

## Original documentation

These deliverables were written in French and are not included in this repository:

| Document | Content |
|---|---|
| Project Log Document (PLD, v6) | Deliverables map, user stories per sprint, workload split, individual sprint reports |
| Technical documentation (TD) | Install and deployment of every stack, architecture, folder conventions, tooling |
| User documentation (UD) | Step-by-step guide to the mobile app, web app and partner dashboard, plus a round-up FAQ |
| Documentation review (DA) | Outline of the web technical and user documentation |
