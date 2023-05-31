"use client";
import Input from "@/app/components/Input";
import React, { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    if (variant === "REGISTER") {
      // axios to regitesr route
    }
    if (variant === "LOGIN") {
      // axios to login route
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    // next auth socail signit (git/google...)
  };

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="
      bg-whit px-4 py-8 shadow-sm sm:rounded-lg sm:px-10
      
      ">
        <form
            className="space-w-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Input errors={errors} label="Email"  id="email" register={register} /> 

        </form>
      </div>
    </div>
  );
};

export default AuthForm;
