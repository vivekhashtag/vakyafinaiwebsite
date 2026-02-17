# Vakya Intelligence - SentinelFlow Website

## Project Overview
**Company**: Vakya Intelligence Private Limited
**Product**: SentinelFlow - The Financial Intelligence Operating System
**Website Type**: Single-page marketing/showcase site for enterprise B2B SaaS
**Target Audience**: C-suite executives (CCO, CFO, CRO, CIO) at Indian financial institutions (banks, NBFCs, insurance, asset managers)

## Product - Three Engines
1. **SentinelCore** - Compliance Intelligence (RegMap AI, Compliance Graph, Transaction Sentinel, Auto-Reg Reporting)
2. **Workflow Nexus** - Process Automation (DocuMind AI, Reconciliation Brain, Approval Flow AI, ExceptionIQ)
3. **DecisionIQ** - Causal Intelligence (Market Cause Engine, Risk Decomposition, Counterfactual Simulator, Regulatory Impact Predictor)

## Team
- **Vivek Dhandapani** - Co-Founder & CEO (Gen AI Architect, Bain & Company, IIT Madras, IIM Shillong, BFSI SME, ML AI Specialist)
- **Sinchana Bangera** - Co-Founder & CTO (NLP & Financial Technology, Finance + AI Specialist)
- **Advisors**: Gautham Chainani (Former CHRO, JSW), Dr. Vishakha Bansal (IIM Shillong)

## Tech Stack
- **Static site**: HTML + CSS + vanilla JavaScript (no frameworks)
- **Fonts**: Space Grotesk (display), Inter (body), JetBrains Mono (code/data) via Google Fonts
- **No build tools** - just open index.html in browser

## Brand & Design
- **Background**: `#080226` (deep dark navy)
- **Accent**: `#36eee0` (cyan/turquoise)
- **Secondary accent**: `#6c63ff` (purple, used in gradients)
- **Text**: `#f0f0f5` (primary), `#a0a0b8` (secondary), `#6a6a85` (dim)
- **Tone**: Professional, not startup-y. Data-driven, not emotional. Confident, not arrogant.
- **Logo**: White "VA" monogram on dark navy background (`logo.png`)

## File Structure
```
index.html    - Main page with all sections (nav, hero, problem, platform, engines, why-vakya, impact, technology, team, contact, footer)
styles.css    - All styling with CSS custom properties
script.js     - Particle canvas, scroll reveals, counters, tilt effects, navbar, form handling
logo.png      - Company logo (VA monogram)
CLaude.pdf    - Full product documentation & website blueprint (34 pages) - SOURCE OF TRUTH for all content
```

## Key Design Features
- Interactive particle constellation canvas in hero (mouse-reactive)
- Scroll-triggered reveal animations
- Animated counters for metrics
- 3D tilt effect on cards
- Glassmorphism card styling
- Glow/pulse effects on accent elements
- Fully responsive (mobile, tablet, desktop)

## Current Status
- Team section uses initials circles (VD, SB for founders; GC, VB for advisors) — no photo placeholders, looks intentional
- Differentiator section photo placeholders removed — cards show icon + title + description only
- Contact form uses Formspree for email delivery to reachvivekd@gmail.com (requires Formspree form ID setup)
- Enterprise-focused only (SME/startup tier discussed but deferred for later)

## Key Decisions Made
- Site uses user-specified colors (#080226, #36eee0) instead of PDF-suggested palette
- Company name in footer: "Vakya Intelligence Private Limited" (user-edited from "Vakya Technologies")
- Footer badges show engine names instead of institutional affiliations (user-edited)
- Hero badge: "Backed by IIM Research" only (user removed "IndiaAI Challenge Finalist")
- Vivek's credentials updated to: Gen AI Architect, Bain & Company, IIT Madras, IIM Shillong, BFSI SME, ML AI Specialist

## Future Considerations
- SME/startup tier landing page or section (discussed, deferred)
- Replace team initials with actual photos when available
- Possible separate pages for each engine (deep-dive)
