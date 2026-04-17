Project Instruction Manual: React + Vite + Supabase
1\. Core Tech Stack
Frontend: React (Vite)
Styling: Tailwind CSS (with PostCSS \& Autoprefixer)
Database/Auth: Supabase (SQL-first)
Icons: Lucide React
Date Handling: date-fns
Utilities: clsx, tailwind-merge (for dynamic classes)
Hosting: GitHub (with automated workflows)

2\. Mandatory Project Structure
Never place logic in the root. Adhere strictly to this hierarchy:

Root Directory:

public/

.github/workflows/production.yml

.env # Private keys (gitignored)

.env.example # Public placeholders for keys

schema.sql # Master Database Source of Truth

vite.config.js

tailwind.config.js

package.json

src Directory:

src/assets/ # Images, svgs, static files

src/components/ # Reusable UI components

src/hooks/ # Custom React hooks (useAuth, useData)

src/layouts/ # Page wrappers (Sidebar, Navbar)

src/lib/ # Third-party clients (supabase.js)

src/pages/ # View components (Dashboard, Login)

src/styles/ # Global CSS and Tailwind directives

src/App.jsx

Action: Immediately delete Vite boilerplate (App.css, index.css defaults, react.svg) upon project start.



3\. Development Workflow \& Ethics

Plan Then Approve: If any logic is ambiguous or multiple paths exist, ask and wait for approval before executing.



Clean Code: Remove all irrelevant default code. Only ship code necessary for the project.



Atomic Commits: At the end of every task, save a git commit with a single, clear title summarizing the work.



Component Pattern: Use Functional Components with Arrow Functions.



UI Hygiene: Every data-fetch must include a Loading and Error state. Never leave the user without feedback.



4\. Database \& Supabase Protocol (schema.sql)

Keep one master schema.sql that mirrors the live Supabase database exactly.



RLS-First: ALTER TABLE ENABLE ROW LEVEL SECURITY; must be at the top of every table definition.



Policy Overrides: Always use DROP POLICY IF EXISTS before CREATE POLICY.



Idempotency: Use CREATE TABLE IF NOT EXISTS.



The "Alter" Strategy: Use ALTER TABLE ... ADD COLUMN IF NOT EXISTS for all updates to preserve existing data.



Soft Delete: Add a deleted\_at (timestamp) column to every table.



Automatic Filters: All SELECT policies must automatically filter for WHERE deleted\_at IS NULL.



Client Init: Initialize the client once in src/lib/supabase.js and export it.



5\. Security \& Safety

Environment Variables: Never hardcode secrets. Access them via import.meta.env.



Sanitization: \* Never use dangerouslySetInnerHTML without DOMPurify.



Always use supabase-js for DB actions; never use raw SQL template literals from user input.



Validation: Use proper input sanitization to prevent malicious code injection.



6\. Styling \& UI Standards

Framework: Use Tailwind CSS utility classes exclusively.



Icons: Use Lucide React for all iconography. Maintain consistent sizing (default to size={20}).



Dynamic Classes: Use a cn() utility (combining clsx and tailwind-merge) for all conditional styling.



Layout: Apply a mobile-first responsive approach.



Clean Logic: If a component requires complex conditional styling, move that logic into a variable above the return statement.



7\. Deployment Configuration

Base Path: If uploading to a subfolder, explicitly set the base property in vite.config.js.



Example: base: '/portfolio/'



Environment Portability: Whenever a new key is added to .env, create a corresponding entry in .env.example.



8\. State Management

Approach: Use Zustand for global state (Auth, User Settings) to avoid prop-drilling.



Implementation: Keep stores in src/hooks/ or a dedicated src/store/ folder if logic becomes complex.

