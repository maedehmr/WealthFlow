# WealthFlow Project Rules

## Architecture

This is a pnpm monorepo.

Structure:

- apps/web → Next.js frontend
- apps/api → NestJS backend
- packages/models → shared TypeScript models

---

## Naming Convention

### Folders

- All folder names must use **camelCase**.
- Never use PascalCase, kebab-case, or snake_case for folders unless explicitly required by a framework.

Examples:

✅ auth  
✅ userProfile  
✅ sharedModels  
❌ UserProfile  
❌ user-profile  
❌ user_profile

### Files

#### TypeScript (.ts)

- All `.ts` files must use **camelCase**.

Examples:

✅ authApi.ts  
✅ authService.ts  
✅ userStore.ts  
✅ loginSchema.ts  
✅ createUserDto.ts

#### React Components (.tsx)

- All React component files (`.tsx`) must use **PascalCase**.

Examples:

✅ LoginForm.tsx  
✅ UserCard.tsx  
✅ SidebarLayout.tsx  
✅ DashboardHeader.tsx

#### Next.js App Router (`app/`)

Inside the `app/` directory, always follow the official Next.js App Router naming conventions.

##### Route folders

- Route segment folders must use **kebab-case**.

Examples:

✅ dashboard/
✅ user-profile/
✅ reset-password/
❌ userProfile/
❌ UserProfile/

##### Special App Router files

Always use the exact filenames required by Next.js.

Examples:

- page.tsx
- layout.tsx
- loading.tsx
- error.tsx
- not-found.tsx
- template.tsx
- default.tsx
- route.ts
- icon.tsx
- apple-icon.tsx
- favicon.ico
- opengraph-image.tsx
- twitter-image.tsx
- sitemap.ts
- robots.ts
- manifest.ts

Never rename these files or change their casing.

---

## Frontend Rules (Next.js)

- Use Feature-Based Architecture.
- Separate UI from business logic.
- Components must never call APIs directly.
- API calls belong in the `api` layer.
- Business logic belongs in the `model` layer.
- UI components belong in the `ui` layer.
- Shared types belong in the `types` layer.
- Use Zustand for global state.
- Use React Query for server state.
- Keep components as presentational as possible.

Example:

```text
features/
└── auth/
    ├── api/
    ├── model/
    ├── types/
    └── ui/
```

---

## Backend Rules (NestJS)

- Use Modular Architecture.
- Controllers should only handle HTTP concerns.
- Business logic belongs in Services.
- Validate requests using DTOs.
- Shared models must come from `packages/models`.
- Follow NestJS official best practices.

---

## Coding Style

- Use TypeScript.
- Prefer interfaces for public contracts.
- Keep functions small and focused.
- Avoid unnecessary dependencies.
- Do not rewrite existing code unless required.
- Reuse existing utilities whenever possible.
- Follow the project's existing coding style.
- Keep naming consistent throughout the project.
- Prefer composition over duplication.

---

## Before Coding

Always:

1. Inspect the existing files.
2. Understand the current architecture.
3. Follow the existing project patterns.
4. Make the smallest required change.
5. Preserve backward compatibility whenever possible.
6. Follow all naming conventions defined in this document.
7. Do not introduce new patterns unless necessary.
8. Keep code clean, readable, and maintainable.