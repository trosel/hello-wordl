import dictionary from "./shavianDictionary.json";

export enum Difficulty {
  Normal,
  Hard,
  UltraHard,
}

export const maxGuesses = 6;

export const dictionarySet: Set<string> = new Set(dictionary);

function mulberry32(a: number) {
  return function () {
    var t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function urlParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name);
}

export const seed = Number(urlParam("seed"));
const makeRandom = () => (seed ? mulberry32(seed) : () => Math.random());
let random = makeRandom();

export function resetRng(): void {
  random = makeRandom();
}

export function pick<T>(array: Array<T>): T {
  return array[Math.floor(array.length * random())];
}

// https://a11y-guidelines.orange.com/en/web/components-examples/make-a-screen-reader-talk/
export function speak(
  text: string,
  priority: "polite" | "assertive" = "assertive"
) {
  var el = document.createElement("div");
  var id = "speak-" + Date.now();
  el.setAttribute("id", id);
  el.setAttribute("aria-live", priority || "polite");
  el.classList.add("sr-only");
  document.body.appendChild(el);

  window.setTimeout(function () {
    document.getElementById(id)!.innerHTML = text;
  }, 100);

  window.setTimeout(function () {
    document.body.removeChild(document.getElementById(id)!);
  }, 1000);
}

export function ordinal(n: number): string {
  return n + ([, "𐑕𐑑", "𐑯𐑛", "𐑛"][(n % 100 >> 3) ^ 1 && n % 10] || "𐑔");
}

export const englishNumbers =
  "𐑟𐑽𐑴 𐑢𐑳𐑯 𐑑𐑵 𐑔𐑮𐑰 𐑓𐑹 𐑓𐑲𐑝 𐑕𐑦𐑒𐑕 𐑕𐑧𐑝𐑩𐑯 𐑱𐑑 𐑯𐑲𐑯 𐑑𐑧𐑯 𐑦𐑤𐑧𐑝𐑩𐑯".split(" ");
