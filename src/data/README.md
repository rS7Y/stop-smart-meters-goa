# Moderating comments

Comments on the site are static, version-controlled, and human-moderated. No external database, no third-party storage, no Firebase, no signup.

## How a comment becomes visible

1. A visitor fills the **Name + Comment** form on the homepage and clicks *Post comment*.
2. The form posts to **formsubmit.co**, which emails the comment to the admin (currently `rustyvz.v@gmail.com`).
3. The visitor sees a *"Thanks, your comment will appear after review"* message.
4. **You** (admin) review the email. If it should be published:

   - Open `src/data/comments.json` in this repo.
   - Add a new entry at the **start** of the array (newest first is already handled, but keeping order makes diffs cleaner):

     ```json
     {
       "name": "Maria Fernandes, Panaji",
       "date": "2026-06-14",
       "text": "I refused the smart meter on 12 June. The Digi Smart team came back twice with police. We held our ground using Section 47(5)."
     }
     ```

   - Commit and push. GitHub Actions rebuilds and redeploys the site in ~30 seconds. The comment appears.

## First-time setup (one-time, ~30 seconds)

formsubmit.co requires the admin to confirm their email **once**, the first time anyone submits a comment.

When the first submission lands, you'll get an email from `noreply@formsubmit.co` with a confirmation link. **Click it.** From then on, every submission goes straight to your inbox with no further action needed.

## Spam handling

- The form has a hidden honeypot field — most bots fill it and are silently rejected.
- formsubmit.co's `_captcha=false` is set because you'll moderate every comment manually anyway.
- If spam becomes a problem later, change the form to set `_captcha=true` (visible reCAPTCHA before submission).

## Changing the admin email

Edit `src/components/Comments.astro` and change the `submitTo` default, or pass `submitTo="other@example.com"` from `src/pages/index.astro`.

## JSON schema

`src/data/comments.json` is either:

- **Flat array** (current): one list, page-agnostic.
  ```json
  [{ "name": "...", "date": "...", "text": "..." }]
  ```
- **Per-page object** (future, if multiple pages get their own threads):
  ```json
  {
    "goa-pros-cons-home": [{ "name": "...", "date": "...", "text": "..." }],
    "another-page-id": [...]
  }
  ```

The component auto-detects either shape.
