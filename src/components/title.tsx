interface TitleProps {
  title: string;
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
}

export default function Title({
  title,
  showSearch = false,
  searchValue = "",
  onSearchChange,
  onSearchSubmit,
}: TitleProps) {
  return (
    <div className="flex items-center justify-between bg-accentLightColor h-[60px]">
      <h2 className="text-title pl-16 relative before:absolute before:top-1/2 before:translate-y-[-50%] before:left-4 before:w-7 before:h-[60px] before:rounded-xl before:bg-accentBaseColor">
        {title}
      </h2>
      {showSearch && (
        <div className="relative inline mr-4">
          <input
            type="email"
            className="w-96 p-3 pr-[80px] border rounded-md focus:outline-none focus:ring-2 focus:ring-accentBaseColor h-[50px]"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
          <button
            className="px-4 bg-accentBaseColor text-button text-baseColor rounded-r-md border border-l-0 h-[50px] absolute right-0"
            onClick={onSearchSubmit}
          >
            検索
          </button>
        </div>
      )}
    </div>
  );
}
