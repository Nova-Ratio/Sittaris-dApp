import Image from "next/image";

export function Token({
  amount = 12000,
  width = 20,
  height = 20,
  addClass = "",
}: {
  amount?: number | string;
  width?: number;
  height?: number;
  addClass?: string;
}) {
  return (
    <div className={` flex items-center gap-2 text-xl font-semibold  ${addClass} `}>
      <Image
        src={"/assets/tokens/sittaris.svg"}
        width={width}
        height={height}
        alt="token icon"
      />
      {amount}
    </div>
  );
}
