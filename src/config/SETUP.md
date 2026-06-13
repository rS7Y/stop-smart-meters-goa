# Turning on the comment section (one-time, ~2 minutes)

The comment box on the **Pros and Cons of Smart Meters** page stores comments in
a free **Firebase Firestore** database, so that every visitor sees the same
comments. Until you complete these steps, the page still works — the comment box
just shows a "being set up" notice instead of accepting posts.

You only have to do this once. After that, you (or I) just edit one file.

---

## Step 1 — Create a free Firebase project

1. Go to <https://console.firebase.google.com> and sign in with a Google account.
2. Click **Add project**, give it any name (e.g. `stop-smart-meters-goa`), and
   click through (you can disable Google Analytics — it isn't needed).

## Step 2 — Create the database

1. In the left menu, open **Build → Firestore Database**.
2. Click **Create database**, choose a location near India (e.g. `asia-south1`),
   and select **Start in production mode**.

## Step 3 — Set the security rules

In the Firestore **Rules** tab, paste the following and click **Publish**. These
rules let anyone read comments and post a comment, while blocking edits/deletes
and enforcing a sensible size limit:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{comment} {
      allow read: if true;
      allow create: if request.resource.data.name is string
                    && request.resource.data.name.size() > 0
                    && request.resource.data.name.size() <= 80
                    && request.resource.data.text is string
                    && request.resource.data.text.size() > 0
                    && request.resource.data.text.size() <= 3000
                    && request.resource.data.pageId is string;
      allow update, delete: if false;
    }
  }
}
```

## Step 4 — Get your web config

1. Click the **gear icon → Project settings**.
2. Scroll to **Your apps**, click the **Web** icon (`</>`), register an app
   (any nickname, no hosting needed).
3. Firebase shows a `firebaseConfig = { ... }` object. Copy those values.

## Step 5 — Paste the config into the site

Open **`src/config/comments.ts`** and fill in the values you copied:

```ts
export const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef...",
};
```

Commit and push. The comment section goes live automatically on the next deploy.

> **Note:** These web config values are *public by design* — Firebase intends
> them to ship in the browser. Your data is protected by the security rules in
> Step 3, not by hiding these keys.

---

## Optional — moderation / deleting a comment

To remove a comment, open **Firestore Database → Data → `comments`** in the
Firebase console and delete the unwanted document. (Visitors can't delete or
edit comments themselves — only you, from the console.)
