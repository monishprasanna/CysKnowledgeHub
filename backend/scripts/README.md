# Database & Test User Scripts

## Database Overview

### Collections

#### `users`
Stores one document per authenticated user. Created automatically on first sign-in via `POST /api/auth/login`.

| Field | Type | Description |
|---|---|---|
| `uid` | String (unique) | Firebase Auth UID — primary link between Firebase and MongoDB |
| `email` | String (unique) | User's email address |
| `displayName` | String | Display name from Firebase profile |
| `photoURL` | String | Profile photo URL (optional) |
| `provider` | String | Auth provider: `'google'` or `'password'` |
| `role` | String | One of `'student'`, `'author'`, `'admin'` — defaults to `'student'` |
| `createdAt` | Date | First sign-in timestamp |
| `lastLoginAt` | Date | Most recent sign-in timestamp |

#### `topics`
CTF writeup categories created and managed by admins.

| Field | Type | Description |
|---|---|---|
| `title` | String | Topic display name |
| `slug` | String (unique) | URL-safe identifier, auto-generated from title |
| `description` | String | Short description shown on the public page |
| `order` | Number | Display sort order (lower = first) |
| `createdBy` | String | Firebase UID of the admin who created it |

#### `articles`
CTF writeup articles authored by users with the `author` or `admin` role.

| Field | Type | Description |
|---|---|---|
| `title` | String | Article title |
| `slug` | String (unique) | URL-safe identifier, auto-generated from title |
| `topicId` | ObjectId | Reference to a `topics` document |
| `content` | String | Full article body in Markdown |
| `coverImage` | String | URL to the cover image (uploaded to `uploads/ctf-images/`) |
| `authorUid` | String | Firebase UID of the author |
| `authorName` | String | Display name snapshot at time of creation |
| `status` | String | `draft` → `pending` → `approved` → `published` / `rejected` |
| `rejectionReason` | String | Admin's reason when status is `rejected` |
| `order` | Number | Display sort order within the topic |
| `tags` | String[] | List of tag strings |
| `publishedAt` | Date | Timestamp when status was set to `published` |

---

### Article Status Lifecycle

```
draft ──[submit]──▶ pending ──[approve]──▶ approved ──[publish]──▶ published
                         └──[reject]──▶ rejected ──[edit + resubmit]──▶ pending
```

---

### Role Hierarchy

| Role | Can do |
|---|---|
| `student` | View published content only |
| `author` | Create/edit/submit own articles, upload images |
| `admin` | Everything — plus promote users, manage topics, approve/reject/publish articles |

The first admin must be set manually in MongoDB (see below). After that, admins can promote others via the Admin Dashboard UI.

---

## Test User Scripts

### Prerequisites

- MongoDB running locally (`mongodb://localhost:27017/cybershield`)
- `backend/.env` configured (see [backend README](../README-backend.md))
- Firebase service account key at `backend/src/config/serviceAccountKey.json`

### Create test users

```bash
cd backend
npm run seed:test-users
```

This creates three accounts in **both Firebase Auth and MongoDB** with preset roles:

| Role | Email | Password |
|---|---|---|
| `admin` | `admin@cys-test.local` | `CysTest@Admin1` |
| `author` | `author@cys-test.local` | `CysTest@Author1` |
| `student` | `student@cys-test.local` | `CysTest@Student1` |

> The script is **idempotent** — running it multiple times will not create duplicates. It reuses existing Firebase users and upserts MongoDB documents.

### Remove test users

```bash
cd backend
npm run clear:test-users
```

This deletes all three test accounts from both **Firebase Auth and MongoDB**. It safely skips any that do not exist, so it will not error if the users were already removed.

---

## Setting the First Admin Manually

Since there is no admin to promote the first admin, set it directly in MongoDB:

```bash
mongosh cybershield
```

```js
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

After that, use the **Admin Dashboard** in the UI to promote other users.

---

## Image Uploads

Uploaded images are stored on disk at `backend/uploads/ctf-images/` and served as static files at `/uploads/ctf-images/<filename>`.

- Max file size: **2 MB**
- Allowed types: images only (`image/*`)
- The directory is tracked in git via `.gitkeep` but uploaded files are excluded via `.gitignore`
