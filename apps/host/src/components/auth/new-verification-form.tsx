"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "@/components/ui/dynamic-island-toaster";
import { authApi } from "@/lib/api";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const NewVerificationForm = () => {
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const hasCalled = useRef(false);

  const onSubmit = useCallback(async () => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    if (!token) {
      toast.error("Missing token!");
      setLoading(false);
      return;
    }

    try {
      const data = await authApi.verifyEmail(token);
      if (data.success) toast.success(data.success);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    // Small delay to avoid "set state in effect" lint error and handle strict mode double-invoke nicely
    const timeout = setTimeout(() => {
      onSubmit();
    }, 0);
    return () => clearTimeout(timeout);
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {loading && (
          <BeatLoader />
        )}
        {!loading && (
          <p className="text-sm text-muted-foreground text-center">
            Verification process completed. You can now login.
          </p>
        )}
      </div>
    </CardWrapper>
  );
};
