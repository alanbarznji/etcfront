import { useState } from "react";

const CategoryTypes = () => {
  const [categories, setCategories] = useState([
    { name: "Tours", count: 92, value: false },
    { name: "Attractions", count: 45, value: false },
    { name: "Day Trips", count: 21, value: false },
    { name: "Outdoor Activities", count: 78, value: false },
    { name: "Concerts & Shows", count: 679, value: true },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (index) => {
    console.log(index);
    
    setCategories((prevCategories) =>
      prevCategories.map((category, i) =>
        i === index ? { ...category, value: !category.value } : category
      )
    );
  };

  // Filter categories based on search input (ignores case sensitivity)
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="dropdownSearch" className=" absolute md:relative bg-white z-10  border-b-2">
      <div className="  ">
        <label htmlFor="input-group-search" className="sr-only">Search</label>
        <div className="relative  w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none w-full">
            <svg className="w-4 h-4 text-black dark:text-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input
            type="text"
            id="input-group-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="  text-black text-sm  border-b-2 focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:placeholder-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-0"
            placeholder="Search category"
          />
        </div>
      </div>

      {/* Display filtered categories */}
      <ul className="h-56 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200 gap-5 flex flex-col w-full">
        {filteredCategories.map((category, i) => (
          <li key={category.name}>
            <div className="flex items-center p-2 rounded-sm hover:bg-blue-500  ">
              <input
                checked={category.value}
                onChange={() => handleCheckboxChange(categories.findIndex(c => c.name === category.name))}
                id={`checkbox-item-${i}`}
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-black"
              />
              <label htmlFor={`checkbox-item-${i}`} className="w-full ms-2 text-sm font-medium text-gray-900 rounded-sm ">
                {category.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryTypes;
