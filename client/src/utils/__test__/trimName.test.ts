import { test, expect } from "vitest";
import { trimName } from "../name";

test("trim the song name after -", () => {
  expect(trimName("這麼多年 - 電影《我想和你在一起》插曲")).toBe("這麼多年");
});

test("trim the song name after (", () => {
  expect(trimName("3D (feat. Jack Harlow)")).toBe("3D");
});

test("trim the song name after (", () => {
  expect(
    trimName("A Beautiful Life(From the Netflix Film 'A Beautiful Life')")
  ).toBe("A Beautiful Life");
});

test("trim the name after noting", () => {
  expect(trimName("Dream")).toBe("Dream");
});
