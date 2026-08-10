import { BsExclamationTriangle } from "react-icons/bs";
import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
        <BsExclamationTriangle className="text-destructive h-10 w-10" />
      </div>
    </CardWrapper>
  );
};
