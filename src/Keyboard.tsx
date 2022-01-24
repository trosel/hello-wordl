import { Clue, clueClass } from "./clue";

interface KeyboardProps {
  letterInfo: Map<string, Clue>;
  onKey: (key: string) => void;
}

export function Keyboard(props: KeyboardProps) {
  const keyboard = [
    "𐑶 𐑬 𐑫 𐑜 𐑖 𐑗 𐑙 𐑘 𐑡 𐑔".split(" "),
    "𐑭 𐑸 𐑷 𐑹 𐑵 𐑿 𐑱 𐑺 𐑳 𐑻 𐑓 𐑞 𐑤 𐑥 𐑒 𐑢 𐑣 𐑠".split(" "),
    "𐑪 𐑨 𐑦 𐑩 𐑼 𐑧 𐑐 𐑯 𐑑 𐑮 𐑕 𐑛".split(" "),
    "𐑚𐑨𐑒𐑕𐑐𐑱𐑕 𐑾 𐑽 𐑲 𐑴 𐑰 𐑚 𐑝 𐑟 𐑮𐑦𐑑𐑻𐑯".split(" "),
  ];

  return (
    <div className="Game-keyboard" aria-hidden="true">
      {keyboard.map((row, i) => (
        <div key={i} className="Game-keyboard-row">
          {row.map((label, j) => {
            let className = "Game-keyboard-button";
            const clue = props.letterInfo.get(label);
            if (clue !== undefined) {
              className += " " + clueClass(clue);
            }
            if (label.length > 1) {
              className += " Game-keyboard-button-wide";
            }
            return (
              <div
                tabIndex={-1}
                key={j}
                role="button"
                className={className}
                onClick={() => {
                  props.onKey(label);
                }}
              >
                {label.replace("Backspace", "🔙")}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
