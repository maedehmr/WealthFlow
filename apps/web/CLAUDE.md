# Frontend Rules (Next.js)

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
