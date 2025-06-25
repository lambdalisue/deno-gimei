import names from "./assets/names.json" with { type: "json" };
import addresses from "./assets/addresses.json" with { type: "json" };

/**
 * Represents a Japanese name or address in multiple scripts.
 */
export type GimeiRecord = {
  /** Kanji representation (漢字) */
  kanji: string;
  /** Hiragana representation (ひらがな) */
  hiragana: string;
  /** Katakana representation (カタカナ) */
  katakana: string;
  /** Romaji representation (ローマ字) */
  romaji: string;
};

/**
 * Represents a full Japanese name with gender, first and last names.
 */
export type GimeiName = GimeiRecord & {
  /** Gender of the name */
  gender: "male" | "female";
  /** First name information */
  first: GimeiRecord;
  /** Last name information */
  last: GimeiRecord;
};

/**
 * Represents a Japanese address composed of prefecture, city, and town.
 */
export type GimeiAddress = GimeiRecord & {
  /** Prefecture-level component of the address */
  prefecture: GimeiRecord;
  /** City-level component of the address */
  city: GimeiRecord;
  /** Town-level component of the address */
  town: GimeiRecord;
};

/**
 * Interface for customizable random number generation.
 */
export interface Randomizer {
  /**
   * Returns a random number in the range [0, 1).
   */
  rnd(): number;
}

/**
 * Gimei is a utility for generating random Japanese names and addresses,
 * including multi-script representations (kanji, kana, romaji).
 */
export class Gimei {
  #randomizer: Randomizer;

  /**
   * Creates a new Gimei instance.
   * @param randomizer Optional custom random number generator.
   */
  constructor(randomizer?: Randomizer) {
    this.#randomizer = randomizer ?? {
      rnd: () => Math.random(),
    };
  }

  /**
   * Generates a random Japanese name.
   * @param gender Optional gender specification. If not provided, a random gender will be chosen.
   * @returns A {@link GimeiName} object containing multi-script representations.
   */
  name(gender?: "male" | "female"): GimeiName {
    gender ??= choice(this.#randomizer, ["male", "female"] as const);
    const first = choice(this.#randomizer, names.first_name[gender]);
    const last = choice(this.#randomizer, names.last_name);
    return {
      gender,
      kanji: `${last[0]} ${first[0]}`,
      hiragana: `${last[1]} ${first[1]}`,
      katakana: `${last[2]} ${first[2]}`,
      romaji: `${last[3]} ${first[3]}`,
      first: {
        kanji: first[0],
        hiragana: first[1],
        katakana: first[2],
        romaji: first[3],
      },
      last: {
        kanji: last[0],
        hiragana: last[1],
        katakana: last[2],
        romaji: last[3],
      },
    };
  }

  /**
   * Generates a random Japanese address.
   * @returns A {@link GimeiAddress} object containing prefecture, city, and town data.
   */
  address(): GimeiAddress {
    const prefecture = choice(this.#randomizer, addresses.addresses.prefecture);
    const city = choice(this.#randomizer, addresses.addresses.city);
    const town = choice(this.#randomizer, addresses.addresses.town);
    return {
      kanji: `${prefecture[0]}${city[0]}${town[0]}`,
      hiragana: `${prefecture[1]}${city[1]}${town[1]}`,
      katakana: `${prefecture[2]}${city[2]}${town[2]}`,
      romaji: `${prefecture[3]}${city[3]}${town[3]}`,
      prefecture: {
        kanji: prefecture[0],
        hiragana: prefecture[1],
        katakana: prefecture[2],
        romaji: prefecture[3],
      },
      city: {
        kanji: city[0],
        hiragana: city[1],
        katakana: city[2],
        romaji: city[3],
      },
      town: {
        kanji: town[0],
        hiragana: town[1],
        katakana: town[2],
        romaji: town[3],
      },
    };
  }
}

/**
 * Selects a random element from the given array using the provided randomizer.
 * @param randomizer The randomizer to use for generating the index.
 * @param values The array to select a value from.
 * @throws If the array is empty.
 * @returns A randomly chosen value from the array.
 */
function choice<T>(randomizer: Randomizer, values: T[]): T {
  if (values.length === 0) {
    throw new Error("Cannot choose from an empty array");
  }
  const index = Math.floor(randomizer.rnd() * values.length);
  return values[index];
}

/**
 * A default instance of Gimei for quick access without manual instantiation.
 */
export const gimei: Gimei = new Gimei();
