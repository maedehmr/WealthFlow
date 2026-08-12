import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Logo } from "@/shared/components";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-6">
      <Logo />
      <LoginForm />
    </div>
  );
}
