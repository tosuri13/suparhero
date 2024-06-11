import { useContext, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { IPhrase } from "textalive-app-api";

import { MusicContext } from "@/components/MusicProvider";

export const LyricBoard = ({ className = "" }: { className?: string }) => {
  const { phrase } = useContext(MusicContext);
  const lyrics = useMemo(
    () =>
      phrase
        ? phraseToComponents(phrase).map((lyric, index) => (
            <div key={index}>{lyric}</div>
          ))
        : undefined,
    [phrase],
  );

  return (
    <div className={twMerge("w-full bg-white p-[24px]", className)}>
      <div className="flex flex-row flex-wrap items-start">{lyrics}</div>
    </div>
  );
};

const phraseToComponents: (phrase: IPhrase) => JSX.Element[] = (
  phrase: IPhrase,
) => {
  let groupedText = "";
  let components: JSX.Element[] = [];

  const toNormalText = (text: string) => {
    return <p className="text-[32px]">{text}</p>;
  };

  const toClickableText = (text: string) => {
    return <p className="cursor-pointer text-[32px] text-red-600">{text}</p>;
  };

  const insertLetterSpace = () => {
    return <span className="inline-block w-[8px]" />;
  };

  for (const word of phrase.children) {
    // 次のトークンが存在する場合
    if (word.next !== null) {
      // 現在のトークンが日本語の場合
      if (word.language === "ja") {
        // 現在のトークンが記号の場合
        if (word.pos === "S") {
          // 現在のトークンが「!!」の場合
          if (word.text === "!!") {
            components.push(toNormalText(word.text));
            components.push(insertLetterSpace());
          }
          // 現在のトークンが「“」の場合
          else if (word.text === "“") {
            groupedText += word.text;
          }
          // 現在のトークンが「”」の場合
          else if (word.text === "”") {
            components.push(toClickableText((groupedText += word.text)));
            groupedText = "";
          }
          // 現在のトークンが「)」の場合
          else if (word.text === ")") {
            components.push(toNormalText(word.text));
            components.push(insertLetterSpace());
          }
          // 次のトークンが上記のいずれの記号でもなかった場合
          else {
            components.push(toNormalText(word.text));
          }
        }
        // 現在のトークンが名詞の場合
        else if (word.pos === "N") {
          // 次のトークンが日本語の場合
          if (word.next.language === "ja") {
            components.push(toClickableText(word.text));
          }
          // 次のトークンが英語の場合
          else if (word.next.language === "en") {
            components.push(toClickableText(word.text));
            components.push(insertLetterSpace());
          }
        }
        // 現在のトークンが記号・名詞以外の場合
        else {
          // 次のトークンが日本語の場合
          if (word.next.language === "ja") {
            components.push(toNormalText(word.text));
          }
          // 次のトークンが英語の場合
          else if (word.next.language === "en") {
            components.push(toNormalText(word.text));
            components.push(insertLetterSpace());
          }
        }
      }
      // 現在のトークンが英語の場合
      else if (word.language === "en") {
        // 次のトークンが記号の場合
        if (word.next.pos === "S") {
          // 次のトークンが「’」の場合
          if (word.next.text === "’") {
            components.push(toNormalText(word.text));
          }
          // 次のトークンが「”」の場合
          else if (word.next.text === "”") {
            groupedText += word.text;
          }
          // 次のトークンが「!!」の場合
          else if (word.next.text === "!!") {
            components.push(toNormalText(word.text));
          }
          // 次のトークンが「)」の場合
          else if (word.next.text === ")") {
            components.push(toNormalText(word.text));
          }
          // 次のトークンが上記のいずれの記号でもなかった場合
          else {
            components.push(toNormalText(word.text));
            components.push(insertLetterSpace());
          }
        }
        // 次のトークンが記号以外の場合
        else if (word.next.pos !== "S") {
          components.push(toNormalText(word.text));
          components.push(insertLetterSpace());
        }
      }
    }
    // 次のトークンが存在しない場合(曲の最後のみ)
    else {
      components.push(toNormalText(word.text));
    }
  }

  return components;
};
