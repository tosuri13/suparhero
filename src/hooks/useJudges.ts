import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useJudges = () => {
  return useQuery({
    queryKey: ["judges"],
    initialData: [] as boolean[][],
    enabled: false,
  });
};

export const useClearJudges = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await queryClient.setQueryData(["judges"], []);
    },
  });
};

export const useUpdateJudges = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (judge: boolean[]) => {
      await queryClient.setQueryData(["judges"], (prev: boolean[][]) => {
        return [...prev, judge];
      });
    },
  });
};
