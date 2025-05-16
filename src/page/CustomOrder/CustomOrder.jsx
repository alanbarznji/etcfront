import { ArrowLeft } from "lucide-react";
import { useState, useRef } from "react";
import Image from "../../assets/image.png";

const CustomOrderDashboard = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [Length, setLength] = useState("");
  const [images, setImages] = useState(["", "", ""]);
  const fileInputs = useRef([]);

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedImages = [...images];
      updatedImages[index] = URL.createObjectURL(file);
      setImages(updatedImages);
    }
  };

  const handleImageClick = (index) => {
    console.log(fileInputs.current[index]);
    
    fileInputs.current[index].click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", { name, email, phone, height, width, images });
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-lg">
      <div className="flex justify-between items-center gap-4 py-10">
        <button className="border p-2 rounded-4xl hover:bg-primary transition-all hover:text-thirdly">
          <ArrowLeft className="" />
        </button>
        <h2 className="text-3xl font-bold text-primary">Custom Order Form</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
          required
        />
        <div className="flex space-x-4">
          <input
            type="number"
            placeholder="Height (y)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-1/2 p-3 border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Width (x)"
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="w-1/2 p-3 border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
          <input
            type="number"
            placeholder="Length (z)"
            value={Length}
            onChange={(e) => setLength(e.target.value)}
            className="w-1/2 p-3 border border-primary rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="border p-4 rounded-lg bg-white flex flex-col items-center relative">
              <img
                src={image.length > 0 ? image : Image}
                alt={`Preview ${index + 1}`}
                className="w-full h-full object-cover rounded-lg cursor-pointer"
                onClick={() => handleImageClick(index)}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(index, e)}
                className="hidden"
                ref={(el) => (fileInputs.current[index] = el)}
                required
              />
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg text-lg font-semibold hover:bg-secondary transition"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CustomOrderDashboard;
