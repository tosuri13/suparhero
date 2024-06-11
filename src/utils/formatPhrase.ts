import { IPhrase } from "textalive-app-api";

export const formatPhrase = (phrase: IPhrase) => {
  let formatedText = "";

  for (const word of phrase.children) {
    // 次のトークンが存在する場合
    if (word.next !== null) {
      // 現在のトークンが日本語の場合
      if (word.language === "ja") {
        // 現在のトークンが記号の場合
        if (word.pos === "S") {
          // 現在のトークンが「!!」の場合
          if (word.text === "!!") {
            formatedText += word.text + " ";
          }
          // 現在のトークンが「)」の場合
          else if (word.text === ")") {
            formatedText += word.text + " ";
          }
          // 次のトークンが上記のいずれの記号でもなかった場合
          else {
            formatedText += word.text;
          }
        }
        // 現在のトークンが記号以外の場合
        else if (word.pos !== "S") {
          // 次のトークンが日本語の場合
          if (word.next.language === "ja") {
            formatedText += word.text;
          }
          // 次のトークンが英語の場合
          else if (word.next.language === "en") {
            formatedText += word.text + " ";
          }
        }
      }
      // 現在のトークンが英語の場合
      else if (word.language === "en") {
        // 次のトークンが記号の場合
        if (word.next.pos === "S") {
          // 次のトークンが「’」の場合
          if (word.next.text === "’") {
            formatedText += word.text;
          }
          // 次のトークンが「”」の場合
          else if (word.next.text === "”") {
            formatedText += word.text;
          }
          // 次のトークンが「!!」の場合
          else if (word.next.text === "!!") {
            formatedText += word.text;
          }
          // 次のトークンが「)」の場合
          else if (word.next.text === ")") {
            formatedText += word.text;
          }
          // 次のトークンが上記のいずれの記号でもなかった場合
          else {
            formatedText += word.text + " ";
          }
        }
        // 次のトークンが記号以外の場合
        else if (word.next.pos !== "S") {
          formatedText += word.text + " ";
        }
      }
    }
    // 次のトークンが存在しない場合
    else {
      formatedText += word.text;
    }
  }

  return formatedText;
};
