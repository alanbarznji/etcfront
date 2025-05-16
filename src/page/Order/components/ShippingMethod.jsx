import React, { useState } from 'react';

const ShippingMethod = ({
   addPhoneNumber,
   removePhoneNumber,
     addmorePhoneNumber,
 phoneNumber,
}) => {
  const [selectedOption, setSelectedOption] = useState('Direct Pickup from Office');

  const options = [
    { label: 'استلام مباشر من مكتب الصناعة', price: 'FREE' },
    { label: 'بغداد', price: 'IQD 5,000.000' },
    { label: 'اربيل', price: 'IQD 6,000.000' },
    { label: 'الأنبار', price: 'IQD 6,000.000' },
    { label: 'البصرة', price: 'IQD 6,000.000' },
    { label: 'الديوانية', price: 'IQD 6,000.000' },
    { label: 'المثنى', price: 'IQD 6,000.000' },
    { label: 'النجف', price: 'IQD 6,000.000' },
    { label: 'بابل', price: 'IQD 6,000.000' },
    { label: 'حليجة', price: 'IQD 6,000.000' },
    { label: 'دهوك', price: 'IQD 6,000.000' },
    { label: 'ديالى', price: 'IQD 6,000.000' },
    { label: 'ذي قار', price: 'IQD 6,000.000' },
    { label: 'سليمانية', price: 'IQD 6,000.000' },
    { label: 'صلاح الدين', price: 'IQD 6,000.000' },
    { label: 'كربلاء', price: 'IQD 6,000.000' },
    { label: 'كركوك', price: 'IQD 6,000.000' },
    { label: 'ميسان', price: 'IQD 6,000.000' },
    { label: 'نينوى', price: 'IQD 6,000.000' },
    { label: 'واسط', price: 'IQD 6,000.000' },
  ];

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Shipping Method</h3>
      <ul className="space-y-2">
        {options.map((option, index) => (
          <li
            key={index}
            className={`flex items-center justify-between border rounded-lg p-3 ${
              selectedOption === option.label
                ? 'border-blue-500'
                : 'border-gray-200'
            }`}
          >
            <label className="flex items-center space-x-2 w-full">
              <input
                type="radio"
                name="shipping-method"
                value={option.label}
                checked={selectedOption === option.label}
                onChange={() => setSelectedOption(option.label)}
                className="form-radio text-blue-500"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
            <span className="text-gray-700">{option.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingMethod;
