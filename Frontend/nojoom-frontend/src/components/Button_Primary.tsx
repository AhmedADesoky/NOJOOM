'use client';

interface Button_Primary_Props {
  Label: string;
  On_Click?: () => void;
  Is_Loading?: boolean;
  Is_Disabled?: boolean;
  Size?: 'sm' | 'md' | 'lg';
  Variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  Full_Width?: boolean;
}

export const Button_Primary = ({
  Label,
  On_Click,
  Is_Loading = false,
  Is_Disabled = false,
  Size = 'md',
  Variant = 'primary',
  Full_Width = false,
}: Button_Primary_Props) => {
  const Size_Classes = {
    sm: 'px-4 py-2 text-xs tracking-[0.1em]',
    md: 'px-6 py-3 text-sm tracking-[0.1em]',
    lg: 'px-8 py-4 text-sm tracking-[0.15em]',
  };

  const Variant_Classes = {
    primary: 'bg-Brand_Pink text-white hover:bg-Rose_Dark',
    secondary: 'bg-Surface text-Ink hover:bg-Border',
    outline: 'border border-Border_Light text-Ink hover:border-Ink',
    dark: 'bg-Ink text-white hover:bg-Charcoal',
  };

  return (
    <button
      onClick={On_Click}
      disabled={Is_Disabled || Is_Loading}
      className={`
        font-Body font-medium uppercase rounded-full transition-all duration-300 ease-out
        ${Size_Classes[Size]}
        ${Variant_Classes[Variant]}
        ${Full_Width ? 'w-full' : ''}
        ${Is_Disabled || Is_Loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {Is_Loading ? 'Loading...' : Label}
    </button>
  );
};
