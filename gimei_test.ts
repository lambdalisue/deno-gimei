import { assertEquals, assertMatch, assertStringIncludes } from "@std/assert";
import { Gimei, type GimeiAddress, type Randomizer } from "./gimei.ts";

const fixedRandomizer: Randomizer = {
  rnd: () => 0, // Always choose the first element
};

Deno.test("Gimei.name() generates a name deterministically", () => {
  const gimei = new Gimei(fixedRandomizer);
  const name = gimei.name("male");

  assertEquals(name.gender, "male");
  assertMatch(name.kanji, /^[^\s]+ [^\s]+$/);
  assertStringIncludes(name.hiragana, " ");
  assertStringIncludes(name.katakana, " ");
  assertStringIncludes(name.romaji, " ");
  assertEquals(typeof name.first.kanji, "string");
  assertEquals(typeof name.last.romaji, "string");
});

Deno.test("Gimei.name() chooses gender randomly if omitted", () => {
  const gimei = new Gimei({ rnd: () => 0.99 }); // Should pick "female"
  const name = gimei.name();
  assertEquals(name.gender, "female");
});

Deno.test("Gimei.address() generates a deterministic address", () => {
  const gimei = new Gimei(fixedRandomizer);
  const address: GimeiAddress = gimei.address();

  assertEquals(typeof address.kanji, "string");
  assertEquals(typeof address.prefecture.katakana, "string");
  assertEquals(typeof address.city.hiragana, "string");
  assertEquals(typeof address.town.romaji, "string");
});
