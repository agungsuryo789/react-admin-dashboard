import search from '../assets/search.svg'

interface TableSearchProp {
  onChange: (e: string) => void;
}

const TableSearch: React.FC<TableSearchProp> = ({ onChange }) => {
  return (
    <div className="flex flex-row border-2 min-w-full h-12">
      <input
        type="text"
        placeholder="Search"
        className="bg-white p-2 w-full text-black focus:outline-none"
        onChange={(e) => onChange(e.target.value)}
      />
      <img src={search} alt="search" className="mx-2 my-auto w-5" />
    </div>
  );
};

export default TableSearch;
