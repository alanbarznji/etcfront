import { useState } from "react";
import InputRange from "react-input-range";
 

const PirceSlider = () => {
  const [price, setPrice] = useState({
    value: { min: 0, max:500 },
  });

  const handleOnChange = (value) => {
    setPrice({ value });
  };

  return (
    <div className=" flex md:flex-col">
      <div className="text-14 fw-500"></div>

      <div className="d-flex justify-between mb-5">
        <div className="text-15 text-dark-1">
          <span className="js-lower mx-1">${price.value.min}</span>-
          <span className="js-upper mx-1">${price.value.max}</span>
        </div>
      </div>

      <div className="px-2 w-full md:w-62">
        <InputRange
          formatLabel={(value) => ``}
          minValue={0}
          maxValue={2000}
          value={price.value}
          // classNames={"w-full"}
          onChange={(value) => handleOnChange(value)}
        />
      </div>
    </div>
  );
};

export default PirceSlider;
