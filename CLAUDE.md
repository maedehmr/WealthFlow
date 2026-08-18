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

Never rename these files or change their casing.

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

- Prefer interfaces for public contracts.