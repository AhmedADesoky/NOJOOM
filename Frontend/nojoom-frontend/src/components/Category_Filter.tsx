'use client';

interface Category_Filter_Props {
  Categories: { Id: string; Label: string }[];
  Active_Category: string;
  On_Category_Change: (Category: string) => void;
}

export const Category_Filter = ({
  Categories,
  Active_Category,
  On_Category_Change,
}: Category_Filter_Props) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {Categories.map(({ Id, Label }) => (
        <button
          key={Id}
          onClick={() => On_Category_Change(Id)}
          className={`px-5 py-2.5 text-xs font-Body tracking-[0.1em] uppercase whitespace-nowrap rounded-full transition-all duration-200 ${
            Active_Category === Id
              ? 'bg-Ink text-Primary_White'
              : 'bg-Primary_White text-Ink border border-Border_Light hover:border-Muted_Light'
          }`}
        >
          {Label}
        </button>
      ))}
    </div>
  );
};
