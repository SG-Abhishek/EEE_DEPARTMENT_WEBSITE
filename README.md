# Developer Manual – Editing Website Content with Sanity.io

> **Project**: EEE Department Website (GEC Palakkad)  
> **Purpose**: How to edit, create, and publish content via Sanity Studio

---

## 1. Overview

This website uses **Sanity.io** as a headless CMS.

- Content lives in Sanity’s **Content Lake**.
- The frontend fetches content via the Sanity API.
- Day-to-day content changes are made in **Sanity Studio** — no code changes required for normal text, images, pages, or structured content.

**Website URLs**
| Environment | URL |
|-------------|-----|
| Production  | https://eee-gecpkd.vercel.app/ |
| Local       | http://localhost:3000 |

> **Note**: The production domain may change in the future. Always confirm the current live URL.

Schema (content model) changes **do** require code changes and a Studio rebuild/redeploy.

---

## 2. Accessing Sanity Studio

### Production Studio (Embedded)
The Studio is available at:

**→ https://eee-gecpkd.vercel.app/studio**

You will see the login screen titled **“EEE Department CMS”**.

> If the production domain changes, the Studio will usually be available at `https://<your-domain>/studio`.

### Local Development
```bash
# Inside the project (usually the studio folder or root depending on structure)
npm install
npm run dev
# or specifically for Studio
npx sanity dev
```

| Service          | Local URL                  |
|------------------|----------------------------|
| Frontend website | http://localhost:3000      |
| Sanity Studio    | http://localhost:3333      |

> Note: Even when running locally, the Studio still reads/writes to the **same live Content Lake** (unless you switch the dataset).

---

## 3. Login & Permissions

1. Go to the Studio URL (production or local).
2. Sign in with Google, GitHub, or Email/password (the account that has been invited).
3. If you do not have access, an existing **Project Administrator** must invite you at [manage.sanity.io](https://www.sanity.io/manage).

### Common roles
| Role          | Typical permissions                      |
|---------------|------------------------------------------|
| Administrator | Full control (settings, members, etc.)  |
| Editor        | Create, edit, publish content           |
| Viewer        | Read-only                               |

---

## 4. Content Editing Workflow

### Edit existing content
1. Open the Studio and log in.
2. Use the **left sidebar** to browse document types (e.g. Page, Home, About, Programs, Settings, etc.).
3. Click a document **or** use the top search bar.
4. Edit the fields.
5. Click **Publish** (bottom right).

### Create new content
1. Click the **+** button (top left or inside a document list).
2. Select the document type.
3. Fill all required fields (marked with `*`).
4. Click **Publish**.

### Delete content
1. Open the document.
2. Click the **⋮** (Document actions) menu next to Publish.
3. Select **Delete**.

> Only users with the appropriate role can delete documents.

### Drafts vs Published
- New and edited documents start as **drafts**.
- Drafts are only visible inside Studio (and in preview modes).
- The public website shows the **published** version.
- Outlined circle ≈ has unpublished changes  
- Filled circle ≈ published

---

## 5. Images & Media

- Use the **Media Library** (accessible from Studio or from image fields).
- Upload, organize, and select images.
- Most image fields support hotspot/crop.
- Always fill **alt text** when available for accessibility and SEO.

---

## 6. Visual Editing / Live Preview (if configured)

If the Presentation tool / Visual Editing is enabled in this project:

- You can open a live preview of the website inside Studio.
- Click content on the preview → it jumps you directly to the correct field.
- Changes appear in near real-time.

Look for a **Presentation** or **Preview** tool/tab in the Studio sidebar.

**Preview URLs**
- Production: the current live domain (currently `https://eee-gecpkd.vercel.app`)
- Local: `http://localhost:3000`

---

## 7. Key Concepts for Developers

| Concept       | Description |
|---------------|-------------|
| **Schema**    | Defined in code (usually in `/schemas` or `sanity.config`). Changing fields/types requires a code change + redeploy. |
| **Dataset**   | Usually `production`. |
| **Project ID**| Unique ID of the Sanity project. Found in `sanity.config`, environment variables, or manage.sanity.io. |
| **API tokens**| Used by the frontend. Keep write tokens secret. |
| **CORS**      | Allowed origins managed at manage.sanity.io → Project → API → CORS. Must include the production domain and `http://localhost:3000`. |

Content saved in Studio is immediately available via the Sanity API. How fast it appears on the live site depends on the frontend caching / revalidation strategy.

---

## 8. Running & Deploying

### Local development
```bash
# Frontend
npm run dev          # → http://localhost:3000

# Studio (if separate)
npx sanity dev       # → http://localhost:3333
```

### Deploy changes
- Push changes to the connected Git repository.
- The hosting platform will rebuild the frontend and the embedded Studio.
- Schema changes require a redeploy to take effect in the production Studio.

### Useful CLI commands
```bash
npx sanity documents query '*[_type == "page"][0...5]'
npx sanity dataset list
npx sanity users list
npx sanity cors list
```

---



🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫🚫





## 9. Project Ownership Transfer

If the Sanity project needs to be moved to a different organization or account:

1. Go to [manage.sanity.io](https://www.sanity.io/manage).
2. Select the project → **Settings** → scroll to **Danger zone**.
3. Click **Transfer ownership**.
4. Select the receiving **Organization**.

**Requirements**:
- You must be an Administrator on the project.
- You need appropriate rights on the receiving organization.
- Project ID, datasets, and existing tokens remain unchanged after transfer.

Also ensure:
- Relevant team members are added with the correct roles.
- Billing is configured on the receiving organization if required.

---

## 10. Best Practices

- Prefer editing through Studio (or Visual Editing) for normal content work.
- Always preview important changes before publishing.
- Fill SEO / meta fields when they exist.
- Coordinate before making schema changes (new document types or major field changes).
- Keep dependencies reasonably up to date.
- Never commit write tokens or sensitive credentials to the repository.
- After publishing content, hard-refresh the live site (or wait for revalidation) to see changes.

---

## 11. Quick Checklist

- [ ] Invited to the Sanity project / organization
- [ ] Can log in to the Studio
- [ ] Confirmed Project ID and dataset name
- [ ] Successfully created, edited, and published a test document
- [ ] Checked whether Visual Editing / Presentation is enabled
- [ ] Located the Studio source code / schema files in the repository
- [ ] Verified CORS origins include the production domain and `http://localhost:3000`
- [ ] (If needed) Transferred project ownership to the correct organization

---

## 12. Official Resources

- [Content operators quick start](https://www.sanity.io/docs/user-guides/content-operations-cheatsheet)
- [Sanity Studio documentation](https://www.sanity.io/docs/studio)
- [Visual Editing](https://www.sanity.io/docs/visual-editing)
- [Manage projects & organizations](https://www.sanity.io/manage)
- [Sanity CLI reference](https://www.sanity.io/docs/cli)

---

**Questions or missing access?**  
Contact the current Sanity organization administrator.

---

*Last updated: September 2026*
