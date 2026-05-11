# TestSprite MCP Test Report — sequndang-landing

## 1️⃣ Document Metadata

| Field | Value |
|---|---|
| **Project** | sequndang-landing |
| **URL** | http://localhost:3002 |
| **Test Run Date** | 2026-05-11 |
| **Tool** | TestSprite MCP (development mode) |
| **Total Tests Selected** | 15 / 34 (dev-mode cap) |
| **Tests Completed** | 14 / 15 |
| **Tests Passed** | 14 |
| **Tests Failed / Timed Out** | 1 (TC015 — TrialForm submission, timed out waiting for `POST http://localhost:3001/api/trial-requests`) |
| **Pass Rate** | 93.3% (14/15) |

---

## 2️⃣ Requirement Validation Summary

| TC ID | Title | Category | Priority | Result |
|---|---|---|---|---|
| TC001 | Register for a free trial with valid details | Navigation Bar | High | ✅ Pass |
| TC002 | Jump from the hero to the trial form | Hero Section | High | ✅ Pass |
| TC003 | Navigate from hero to trial registration and submit | Trial Registration Form | High | ✅ Pass |
| TC004 | Submit a valid free trial request | Trial Registration Form | High | ✅ Pass |
| TC005 | Jump from the navbar to the trial form | Navigation Bar | High | ✅ Pass |
| TC006 | Use the navbar to jump to key sections | Navigation Bar | High | ✅ Pass |
| TC007 | Show required-field validation on empty trial form | Trial Registration Form | High | ✅ Pass |
| TC008 | Start trial registration from a pricing plan CTA | Pricing Section | High | ✅ Pass |
| TC009 | Compare pricing plans and use a plan CTA | Pricing Section | High | ✅ Pass |
| TC010 | View the features section | Features Section | High | ✅ Pass |
| TC011 | Read frequently asked questions | FAQ Section | High | ✅ Pass |
| TC012 | View social proof / testimonials | Social Proof Section | High | ✅ Pass |
| TC013 | View the how-it-works / steps section | How It Works Section | High | ✅ Pass |
| TC014 | Contact via the contact section | Contact Section | High | ✅ Pass |
| TC015 | Full trial form end-to-end with API call | Trial Registration Form | High | ⏱️ Timed Out |

---

## 3️⃣ Coverage & Matching Metrics

| Metric | Value |
|---|---|
| High-priority tests executed | 15/15 (100%) |
| Medium/Low tests skipped (dev-mode cap) | 19 skipped |
| Components covered | Navbar, Hero, Pricing, Features, HowItWorks, FAQ, SocialProof, TrialForm, Contact |
| Components NOT tested (skipped tests) | Footer link interactions, mobile responsiveness, scroll-to-top |
| Frontend-only assertions | All 14 passing tests validated purely client-side behavior |
| API-dependent test | TC015 — requires `sequndang-dashboard` running on port 3001 |

---

## 4️⃣ Key Gaps / Risks

### ❗ TC015 Timeout — Dashboard Dependency
**Root Cause**: TC015 submits the TrialForm which calls `POST http://localhost:3001/api/trial-requests` on `sequndang-dashboard`. The dashboard server was not running during the test execution, causing an indefinite hang.

**Fix**: Start the dashboard server (`npm run dev` in `sequndang-dashboard/`) before running TC015, or mock the API endpoint in the test environment.

### ⚠️ 19 Tests Skipped (Development Mode Cap)
TestSprite development mode limits execution to 15 of 34 tests. The following areas were not covered:
- TC016–TC017: More navbar/hero interaction flows
- TC018–TC031: Medium-priority tests (mobile layout, FAQ accordion expand/collapse, footer link navigation, scroll behavior)
- TC032–TC034: Low-priority tests (accessibility, meta tags, social links)

**Fix**: Run in production mode (upgrade TestSprite account) to execute all 34 tests.

### ℹ️ Form Validation Behavior (TC007 — Passed)
The TrialForm's required-field validation passed using browser native HTML5 `required` constraints. If the form is ever refactored to custom JS validation, this test may need to be updated.

### ℹ️ Single-Page Anchor Navigation
The site uses anchor-based navigation (`#features`, `#pricing`, etc.) on a single page. TestSprite handled this correctly for all tested navigation flows (TC002, TC005, TC006, TC008).
