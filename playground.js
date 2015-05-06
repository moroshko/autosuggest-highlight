import highlight from './src/autosuggest-highlight';

console.log(highlight('Mill Park 3082 VIC', 'mill 308'));
// => [[0, 2], [6, 15]]
