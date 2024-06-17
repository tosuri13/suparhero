import { IPhrase } from "textalive-app-api";

import { incorrectsDict } from "@/configs/incorrectsDict";
import { SuparLyric } from "@/types/SuparLyric";

export const phraseToSuparLyrics = (
  phrase: IPhrase,
): (SuparLyric | undefined)[] => {
  let suparLyrics: (SuparLyric | undefined)[] = [];

  for (const word of phrase.children) {
    let isSpaceNeeded = false;

    // 次のトークンが存在する場合
    if (word.next !== null) {
      // 現在のトークンが日本語の場合
      if (word.language === "ja") {
        // 現在のトークンが記号の場合
        if (word.pos === "S") {
          // 現在のトークンが「!!」の場合
          if (word.text === "!!") {
            isSpaceNeeded = true;
          }
          // 現在のトークンが「)」の場合
          else if (word.text === ")") {
            isSpaceNeeded = true;
          }
        }
        // 現在のトークンが記号以外の場合
        else if (word.pos !== "S") {
          // 次のトークンが英語の場合
          if (word.next.language === "en") {
            isSpaceNeeded = true;
          }
        }
      }
      // 現在のトークンが英語の場合
      else if (word.language === "en") {
        // 次のトークンが記号の場合
        if (word.next.pos === "S") {
          // 次のトークンが以下のいずれの記号でもなかった場合
          if (!["’", "”", "!!", ")"].includes(word.next.text)) {
            isSpaceNeeded = true;
          }
        }
        // 次のトークンが記号以外の場合
        else if (word.next.pos !== "S") {
          isSpaceNeeded = true;
        }
      }
    }

    const isClickable = Object.keys(incorrectsDict).includes(word.text);
    suparLyrics.push({
      body: word.text,
      isClickable: isClickable,
      isFalse: isClickable ? Math.random() > 0.5 : false,
    });

    if (isSpaceNeeded) {
      suparLyrics.push(undefined);
    }
  }

  return suparLyrics;
};
