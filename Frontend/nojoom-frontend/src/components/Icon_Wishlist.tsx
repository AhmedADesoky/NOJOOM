'use client';

interface Icon_Wishlist_Props {
  Is_Filled?: boolean;
  On_Click?: (e?: React.MouseEvent) => void;
  Variant?: 'default' | 'card';
}

export const Icon_Wishlist = ({
  Is_Filled = false,
  On_Click,
  Variant = 'default',
}: Icon_Wishlist_Props) => {
  const Button_Classes =
    Variant === 'card'
      ? 'w-9 h-9 flex items-center justify-center bg-Primary_White rounded-full shadow-sm hover:shadow-md transition-shadow'
      : 'p-2 hover:bg-Surface rounded-lg transition';

  return (
    <button onClick={(e) => On_Click?.(e)} className={Button_Classes} aria-label="Wishlist">
      <svg
        width={Variant === 'card' ? 18 : 22}
        height={Variant === 'card' ? 18 : 22}
        viewBox="0 0 24 24"
        fill={Is_Filled ? '#D4899B' : 'none'}
        stroke="currentColor"
        strokeWidth="1.5"
        className={Is_Filled ? 'text-Brand_Pink' : 'text-Ink'}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
};
