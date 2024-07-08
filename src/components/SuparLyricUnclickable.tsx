import { SuparLyricType } from "@/types/SuparLyricType";

export const SuparLyricUnclickable = ({
  suparLyric,
}: {
  suparLyric: SuparLyricType;
}) => {
  return <p className="text-[32px]">{suparLyric.body}</p>;
};
