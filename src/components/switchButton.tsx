export default function SwitchButton({
  on,
  onClick
}: {
  on: boolean;
  onClick: () => void;
}) {
  return (
    <div
      style={{
        height: 16,
        width: 32,
        position: "relative",
        border: "solid 1px #ccc",
        borderRadius: 8,
        cursor: "pointer",
        backgroundColor: "#cccccc50"
      }}
      onClick={onClick}
    >
      <button
        style={{
          cursor: "pointer",
          backgroundColor: "#000",
          height: 14,
          transition: "all 0.3s",
          top: 1,
          width: 14,
          borderRadius: 7,
          position: "absolute",
          left: on ? 16 : 0,
          border: "none"
        }}
      ></button>
    </div>
  );
}
