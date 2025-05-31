import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showError } from "@/lib";
import { toast } from "sonner";
import { client } from "@/lib/api";
import { CacheKeys } from "@/lib";

export const useBookClass = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, unknown, string>({
    mutationFn: (classId: string) =>
      client.post(`/classes/${classId}/book`).then(() => {}),

    onSuccess: (_data, classId) => {
      queryClient.invalidateQueries({ queryKey: [CacheKeys.CLASSES, classId] });
      queryClient.invalidateQueries({ queryKey: [CacheKeys.CLASSES] });
      toast.success("Booked");
    },

    onError: (error) => {
      showError(error);
    },
  });

  return mutation;
};
