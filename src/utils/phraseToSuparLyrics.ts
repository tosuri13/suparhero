import { IPhrase } from "textalive-app-api";

import { incorrectsDict } from "@/configs/incorrectsDict";
import { SuparLyricType } from "@/types/SuparLyricType";

export const phraseToSuparLyrics = (
  phrase: IPhrase,
): (SuparLyricType | undefined)[] => {
  let suparLyrics: (SuparLyricType | undefined)[] = [];

  for (const word of phrase.children) {
    let isSpaceNeeded = false;
    let isIgnore = false;
    let isSuperhero = false;

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
          // 現在のトークンが「“」か「”」の場合
          else if (word.text === "“" || word.text === "”") {
            isIgnore = true;
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
          // 現在のトークンがSUPERHEROの場合
          if (word.text === "SUPERHERO") {
            isSuperhero = true;
          }
          // 次のトークンが以下のいずれの記号でもなかった場合
          else if (!["’", "!!", ")"].includes(word.next.text)) {
            isSpaceNeeded = true;
          }
        }
        // 次のトークンが記号以外の場合
        else if (word.next.pos !== "S") {
          isSpaceNeeded = true;
        }
      }
    }

    const suparLyricBody = isSuperhero ? "“SUPERHERO”" : word.text;
    const isClickable = Object.keys(incorrectsDict).includes(suparLyricBody);

    if (!isIgnore) {
      suparLyrics.push({
        body: suparLyricBody,
        isClickable: isClickable,
        isFalse: isClickable ? Math.random() > 0.5 : false,
      });
    }

    if (isSpaceNeeded) {
      suparLyrics.push(undefined);
    }
  }

  return suparLyrics;
};
