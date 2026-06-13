// ─────────────────────────────────────────────────────────────────────────
//  COMMENT SECTION CONFIGURATION  (Firebase / Firestore)
// ─────────────────────────────────────────────────────────────────────────
//
//  The comment box on the site stores comments in a free Firebase Firestore
//  database so that every visitor sees the same comments. To turn it on,
//  paste your Firebase web config below (see SETUP.md in this folder for the
//  2-minute, step-by-step guide).
//
//  These values are PUBLIC by design — Firebase web keys are meant to be
//  shipped in the browser. Access is controlled by the Firestore security
//  rules described in SETUP.md, not by hiding these keys.
//
//  Until you fill these in, the page still works — the comment box just shows
//  a "comments are being set up" notice instead of accepting posts.
// ─────────────────────────────────────────────────────────────────────────

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Do not edit below this line.
export const commentsConfigured = Object.values(firebaseConfig).every(
  (v) => typeof v === "string" && v.trim().length > 0,
);
