export const doResize = (uiSize, cb) => {
  let scale, origin;

  scale = Math.min(uiSize.size.width / elWidth, uiSize.size.height / elHeight);

  cb(scale);
};

export const starterData = WinCompClass => {
  size = {
    width: WinComp.width(),
    height: WinComp.height()
  };
  return { size };
};
