export const mapCharacterToIndex = (
  character: string
): number => {
  const pos = character.charCodeAt(0);

  if (character.charCodeAt(0) <= 90) {
    return pos - 38;
  } else {
    return pos - 96;
  }
};
