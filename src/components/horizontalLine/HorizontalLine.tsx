import "./HorizontalLine.css";
interface horizontalLineInterface {
  thickness: number;
  color?: string;
}

export function HorizontalLine({ thickness, color }: horizontalLineInterface) {
  return (
    <div
      className="horizontal-line"
      style={{ backgroundColor: color, height: `${thickness}px` }}
    />
  );
}
