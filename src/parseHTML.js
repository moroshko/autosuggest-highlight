export default (text, tag) => {
  const regex = RegExp(`<${tag}>(.*?)<\/${tag}>`);

  return text
    .split(regex)
    .map((text, index) => {
      return {
        text,
        highlight: index % 2 === 1
      };
    })
    .filter(obj => obj.text !== '');
};
