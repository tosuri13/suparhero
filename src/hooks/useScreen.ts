import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type ScreenType = "TITLE" | "TUTORIAL" | "PLAY" | "RESULT";

export const useScreen = () => {
  return useQuery({
    queryKey: ["screen"],
    initialData: "TITLE" as ScreenType,
    enabled: false,
  });
};

export const useSetScreen = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (screen: ScreenType) => {
      await queryClient.setQueryData(["screen"], screen);
    },
  });
};
