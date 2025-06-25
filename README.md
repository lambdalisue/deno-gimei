# deno-gimei

A Deno TypeScript library for generating random Japanese names and addresses.
This is a port of the Ruby [Gimei](https://github.com/willnet/gimei) library.

## Features

- Generate random Japanese names (male, female, or mixed)
- Generate random Japanese addresses
- Support for multiple Japanese scripts: kanji, hiragana, katakana, and romaji
- Customizable random number generation
- TypeScript support with full type definitions
- Zero dependencies

## Installation

```bash
deno add jsr:@lambdalisue/gimei
```

## Usage

### Basic Usage

```typescript
import { gimei } from "@lambdalisue/gimei";

// Generate a random name
const name = gimei.name();
console.log(name.kanji); // 山田 太郎
console.log(name.hiragana); // やまだ たろう
console.log(name.katakana); // ヤマダ タロウ
console.log(name.romaji); // Yamada Tarou

// Generate a random address
const address = gimei.address();
console.log(address.kanji); // 北海道札幌市中央区
console.log(address.hiragana); // ほっかいどうさっぽろしちゅうおうく
console.log(address.katakana); // ホッカイドウサッポロシチュウオウク
console.log(address.romaji); // Hokkaido Sapporo-shi Chuou-ku
```

### Gender-specific Names

```typescript
import { gimei } from "@lambdalisue/gimei";

// Generate male name
const maleName = gimei.name("male");
console.log(maleName.kanji); // 田中 一郎

// Generate female name
const femaleName = gimei.name("female");
console.log(femaleName.kanji); // 佐藤 花子
```

### Custom Randomizer

```typescript
import { Gimei, type Randomizer } from "@lambdalisue/gimei";

// Create a custom randomizer for deterministic results
const customRandomizer: Randomizer = {
  rnd: () => 0, // Always return 0 for testing
};

const gimei = new Gimei(customRandomizer);
const name = gimei.name();
console.log(name.kanji); // Will always be the same name
```

### Name Components

```typescript
import { gimei } from "@lambdalisue/gimei";

const name = gimei.name();

// Access individual name parts
console.log(name.last.kanji); // 山田
console.log(name.first.kanji); // 太郎

// Check if name is male or female
console.log(name.gender); // male or female
```

### Address Components

```typescript
import { gimei } from "@lambdalisue/gimei";

const address = gimei.address();

// Access individual address parts
console.log(address.prefecture.kanji); // 北海道
console.log(address.city.kanji); // 札幌市
console.log(address.town.kanji); // 中央区
```

## API Reference

### Gimei Class

#### Methods

- `name()` - Generate a random name (any gender)
- `address()` - Generate a random address

### Types

#### GimeiName

```typescript ignore
interface GimeiName {
  kanji: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  last: GimeiRecord;
  first: GimeiRecord;
  gender: "male" | "female";
}
```

#### GimeiAddress

```typescript ignore
interface GimeiAddress {
  kanji: string;
  hiragana: string;
  katakana: string;
  romaji: string;
  prefecture: GimeiRecord;
  city: GimeiRecord;
  town: GimeiRecord;
}
```

#### GimeiRecord

```typescript ignore
interface GimeiRecord {
  kanji: string;
  hiragana: string;
  katakana: string;
  romaji: string;
}
```

#### Randomizer

```typescript ignore
interface Randomizer {
  rnd(): number;
}
```

## Development

### Prerequisites

- Deno 2.0 or later

### Running Tests

```bash
deno task test
```

### Type Checking

```bash
deno task check
```

### Updating Data

To fetch the latest name and address data from the original Gimei repository:

```bash
deno task gen
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

This library is inspired by and uses data from the original
[Gimei](https://github.com/willnet/gimei) Ruby library by willnet.
