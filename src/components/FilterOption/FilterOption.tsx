import { FC } from "react";

interface FilterOptionProps {
  category: string;
  setCategory: (category: string) => void;
  isActive: boolean;
}

const FilterOption: FC<FilterOptionProps> = ({
  category,
  setCategory,
  isActive,
}) => {
  return (
    <button
      onClick={() => setCategory(category)}
      className={`capitalize ${isActive ? "" : "text-gray-400"}`}
    >
      {category}
    </button>
  );
};

export default FilterOption;
