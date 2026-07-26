'use client';

interface Icon_Cart_Props {
  Count?: number;
  On_Click?: () => void;
}

export const Icon_Cart = ({ Count = 0, On_Click }: Icon_Cart_Props) => {
  return (
    <button onClick={On_Click} className="relative p-2 hover:bg-Surface rounded-lg transition">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-Ink"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {Count > 0 && (
        <span className="absolute top-0 right-0 bg-Brand_Pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
          {Count}
        </span>
      )}
    </button>
  );
};
