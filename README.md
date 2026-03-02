A modern, web-based subscription agreement and checkout experience for SpotHopper’s marketing platform.

This project replaces static contract PDFs and DocuSign forms with a seamless SaaS-style subscription flow that combines plan selection, billing authorization, agreement acknowledgment, and digital signature in a single responsive interface.

Overview

This subscription experience is designed to:

Present plan tiers clearly (Basic, Premium, Premium Plus)

Display pricing transparency (monthly vs annual commitment)

Outline subscription terms and auto-renew policy

Capture required acknowledgments

Collect billing information (Credit Card or ACH)

Capture digital signature and authorization

Provide a modern, Stripe/Yelp-style checkout experience

The goal is to increase clarity, reduce friction, and modernize contract execution into a user-friendly SaaS onboarding flow.

Key Features
Plan Tiers

Basic
World-class website, email marketing, catering management, job applications, Google integration, and one professional photoshoot.

Premium
World-class website, email marketing, catering management, job applications, Google integration, Facebook integration, and one professional photoshoot.

Premium Plus
World-class website, email marketing, catering management, job applications, Google integration, and Digital Media Suite (professional photo and video shoot).

Billing Structure

12-month subscription commitment

Monthly billing option or prepaid annual option

One-time setup fee (configurable)

Auto-renewal with 30-day cancellation notice requirement

Recurring payment authorization (Credit Card or ACH)

Legal & Compliance Elements

Subscription Services Agreement incorporated by reference

Required checkbox acknowledgments

Initials field for confirmation

Payment authorization consent

Digital signature capture

Auto-renew acknowledgment

Technical Structure

Responsive layout

Two-column desktop layout (Form + Sticky Order Summary)

Mobile-stacked flow

Modular sections:

Business Information

Plan Selection

Add-Ons

Subscription Terms

Payment Method

Signature

No backend logic included in this version. This is a front-end subscription agreement UI prototype.

Design Goals

Modern SaaS checkout aesthetic

Clean typography and spacing

Clear financial hierarchy

Transparent pricing

Reduced contract intimidation

Enterprise credibility

Inspired by Stripe, Yelp Ads, and Shopify billing flows.

Intended Use

This project is intended for:

Sales onboarding flows

Contract modernization initiatives

Replacing PDF-based order forms

Streamlining subscription authorization

Improving close rates through UX clarity

Future Enhancements

Stripe integration

ACH verification

E-signature integration

PDF generation upon submission

CRM sync

Auto-calculated totals based on selections

Audit logging
