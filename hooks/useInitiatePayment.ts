import { showError } from "@/lib";
import { toast } from "sonner";
import { client } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

export const useInitiatePayment = () => {
  const mutation = useMutation({
    mutationFn: (bookingId: string) =>
      client.post("/transaction/initiate", {
        bookingId,
      }),
    // "682f3b542eea8b015311ed54"
    onSuccess: (data) => {
      const paymentResult = {
        authorization_url: data.data.authorization_url,
        message: data.data.message,
        reference: data.data.reference,
        success: data.data.success,
      };

      if (data.data.success === false) {
        toast.error(data.data.message);
        return;
      }

      if (paymentResult.success === true) {
        toast.success(paymentResult.message);
        // window.location.href = paymentResult.authorization_url;
      }
    },

    onError: (error) => showError(error),
  });

  return mutation;
};
