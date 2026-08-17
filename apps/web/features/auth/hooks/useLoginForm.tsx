import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginRequestModel } from "@repo/models";
import { Routes } from "@/shared/constants/routes";
import { useLogin } from "@/features/auth/hooks/useLogin";

const resolver = classValidatorResolver(LoginRequestModel);

export function useLoginForm() {
  const router = useRouter();
  const { mutate, isPending, errorMessage } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestModel>({ resolver });

  const onSubmit = handleSubmit((data) => {
    mutate(data, { onSuccess: () => router.push(Routes.Root) });
  });

  return {
    register,
    errors,
    onSubmit,
    isPending,
    errorMessage,
  };
}
