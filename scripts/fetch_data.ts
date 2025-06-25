import { parse } from "@std/yaml";
import { fromFileUrl } from "@std/path";

const NAMES_URL =
  "https://raw.githubusercontent.com/willnet/gimei/refs/heads/main/lib/data/names.yml";

const ADDRESSES_URL =
  "https://raw.githubusercontent.com/willnet/gimei/refs/heads/main/lib/data/addresses.yml";

export type Record = [
  kanji: string,
  hiragana: string,
  katakana: string,
  romaji: string,
];

export type Names = {
  first_name: {
    male: Record[];
    female: Record[];
  };
  last_name: Record[];
};

export type Addresses = {
  prefecture: Record[];
  city: Record[];
  town: Record[];
};

async function fetchNames(): Promise<Names> {
  const response = await fetch(NAMES_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch names: ${response.statusText}`);
  }
  const text = await response.text();
  return parse(text) as Names;
}

async function fetchAddresses(): Promise<Addresses> {
  const response = await fetch(ADDRESSES_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch addresses: ${response.statusText}`);
  }
  const text = await response.text();
  return parse(text) as Addresses;
}

async function main() {
  console.log("Fetching names.yml");
  const names = await fetchNames();
  console.log("Saving names.json");
  await Deno.writeTextFile(
    fromFileUrl(import.meta.resolve("../assets/names.json")),
    JSON.stringify(names),
  );

  console.log("Fetching addresses.yml");
  const addresses = await fetchAddresses();
  console.log("Saving addresses.json");
  await Deno.writeTextFile(
    fromFileUrl(import.meta.resolve("../assets/addresses.json")),
    JSON.stringify(addresses),
  );
}

if (import.meta.main) {
  try {
    await main();
    console.log("Data fetched and saved successfully.");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
