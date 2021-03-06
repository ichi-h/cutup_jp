/**
 * 対象プラットフォームへの共有リンクを開く
 *
 * @param {String} target プラットフォーム名 (twitter, facebook, pocket)
 */
const openShareLink = (target) => {
  // 対象プラットフォームへの共有リンクの発行
  const shareURL = ((target) => {
    let text = `${document.title} - ${
      document.getElementsByName("description")[0].content
    }`;

    switch (target) {
      case "twitter":
        return `https://twitter.com/share?url=${location.href}&text=${text}`;
      case "facebook":
        return `http://www.facebook.com/sharer.php?u=${location.href}&t=${text}`;
      case "pocket":
        return `http://getpocket.com/edit?url=${location.href}&title=${text}`;
      default:
        throw Error("Received an unknown target.");
    }
  })(target);

  window.open(shareURL);
};

/**
 * 共有ボタンクリック時のイベントハンドラを登録
 */
export const setOpenShareLinkHandler = () => {
  ["twitter", "facebook", "pocket"].forEach((target) => {
    document
      .getElementById(`share-${target}`)
      .addEventListener("click", () => openShareLink(target), false);
  });
};
