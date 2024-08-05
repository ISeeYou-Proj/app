export const getWebviewApiEndpoint = (displayMode: string | null) => {
  const webviewApiEndpoint =
    displayMode === 'totallyBlind'
      ? '/webviewimage/totallyblind'
      : '/webviewimage/lowvision';
  return webviewApiEndpoint;
};
