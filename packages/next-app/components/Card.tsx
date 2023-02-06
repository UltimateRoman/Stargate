interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={
        "h-fit p-4 border border-gray-200 bg-white text-black shadow-lg rounded-lg grid gap-4" + " " + 
        className
      }
    >
      {title ? (
        <div className="text-lg font-bold border-b-2 border-black mb-1 py-1">
          {title}
        </div>
      ) : null}
      <div className="py-2 flex flex-col items-center gap-8">{children}</div>
    </div>
  );
}
