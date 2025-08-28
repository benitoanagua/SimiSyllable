# SimiSyllable 📖

[![npm version](https://badge.fury.io/js/simi-syllable.svg)](https://badge.fury.io/js/simi-syllable)
[![npm downloads](https://img.shields.io/npm/dm/simi-syllable.svg)](https://www.npmjs.com/package/simi-syllable)

**SimiSyllable** is a lightweight and accurate JavaScript/TypeScript library for counting and dividing syllables in English and Spanish. It uses advanced phonetic algorithms to provide precise results without the need for extensive dictionaries.

## Features ✨

- ✅ **Dual Language**: Native support for English and Spanish
- ✅ **Phonetic Algorithms**: Based on linguistic rules, not just dictionaries
- ✅ **Accuracy**: Handles complex cases like hiatuses, diphthongs, and triphthongs
- ✅ **Robust**: Proper handling of accents, diaeresis (ü), and exceptions
- ✅ **TypeScript**: Full typing included
- ✅ **Lightweight**: No heavy dependencies

## Installation 📦

```bash
npm install simi-syllable
```

or

```bash
yarn add simi-syllable
```

## Usage 🚀

### JavaScript

```javascript
import { countEn, syllabifyEn, countEs, syllabifyEs } from "simi-syllable";

// Spanish
console.log(countEs("país")); // 2
console.log(syllabifyEs("país")); // ["pa", "ís"]

console.log(countEs("pingüino")); // 3
console.log(syllabifyEs("pingüino")); // ["pin", "güi", "no"]

// English
console.log(countEn("beautiful")); // 3
console.log(syllabifyEn("beautiful")); // ["beau", "ti", "ful"]
```

### TypeScript

```typescript
import { countEs, syllabifyEs } from "simi-syllable";

const word: string = "murciélago";
const syllables: string[] = syllabifyEs(word);
const count: number = countEs(word);

console.log(`"${word}" has ${count} syllables:`, syllables);
// "murciélago" has 4 syllables: ["mur", "cié", "la", "go"]
```

## API 📋

### Spanish

#### `countEs(word: string, autoAccent?: boolean): number`

Counts syllables in a Spanish word.

- `word`: The word to analyze
- `autoAccent` (optional): Attempts to add accents automatically (experimental)

#### `syllabifyEs(word: string, autoAccent?: boolean): string[]`

Divides a Spanish word into syllables.

### English

#### `countEn(word: string): number`

Counts syllables in an English word.

#### `syllabifyEn(word: string): string[]`

Divides an English word into syllables.

## Supported Special Cases 🎯

### Spanish

- **Accentual hiatuses**: pa-ís, ba-úl, o-ír
- **Diaeresis (ü)**: pingüino, cigüeña, argüir
- **Diphthongs**: aire, auto, bueno
- **Triphthongs**: Paraguay, buey
- **Strong vowels**: poeta, teatro

### English

- **Monosyllables**: the, eye, sky
- **Special endings**: action, nature, possible
- **Silent letters**: knight, psychology
- **Diphthongs**: boat, cloud, coin
- **Compound words**: baseball, sunset

## Examples 📝

```javascript
// Spanish - Hiatuses
countEs("país"); // 2 (pa-ís)
countEs("oír"); // 2 (o-ír)
countEs("construí"); // 3 (cons-tru-í)

// Spanish - Diaeresis
countEs("pingüino"); // 3 (pin-güi-no)
countEs("vergüenza"); // 3 (ver-güen-za)

// English
countEn("beautiful"); // 3
countEn("university"); // 5
countEn("opportunity"); // 5
```

## Testing 🧪

The library includes comprehensive tests for both languages:

```bash
# Run all tests
npm test

# Run only Spanish tests
npm test -- tests/es.test.ts

# Run only English tests
npm test -- tests/en.test.ts

# Run tests with coverage
npm run test:coverage
```

## Contributing 🤝

Contributions are welcome! If you want to improve SimiSyllable:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits 👏

SimiSyllable was developed with a focus on phonetic and linguistic accuracy, implementing specialized algorithms for each language.

## Support 💬

If you encounter any issues or have questions, please open an issue on the [GitHub repository](https://github.com/benitoanagua/SimiSyllable).
