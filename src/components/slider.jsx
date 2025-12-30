
import React from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const NextArrow = ({ onClick }) => {
  return (
    
    <button
      onClick={onClick}
      className="absolute top-1/2 right-0 z-10 -translate-y-1/2 transform rounded-full bg-blue-600 p-2 text-white shadow hover:bg-blue-700"
    >
      <FaChevronRight size={20} />
    </button>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-0 z-10 -translate-y-1/2 transform rounded-full bg-blue-600 p-2 text-white shadow hover:bg-blue-700"
    >
      <FaChevronLeft size={20} />
    </button>
  );
};

const CategorySlider = () => {
 const navigate = useNavigate();
  const categories = [
    {
      title: "Tablets",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SmdEjPyEj3StKLigJnoDXQHSFQHGYGU0SA&s",
    },
    {
      title: "Ayurvedic",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQe5lEFYsLORYpXvFkunzNGvfDY4Pg4TW98w&s",
    },
    {
      title: "Vitamins & Minerals",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTy8rXpbroHl-QjhQ6DYKtxA9DluiKdpbwELQ&s",
    },
    {
      title: "First Aid",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmmW82M6_k3dIXPBoCZV6LmQbWRI7aUHgL_A&s",
    },
    {
      title: "Dental Care",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYqh3Pfto4Qpv9MBHKEi5uRFBP3LqlG-EclQ&s",
    },
    {
      title: "Injections",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7W-akGnEAQx3SWns06aHk-U_R9_MYmdNA5w&s",
    },
    {
      title: "Homeopathic",
      img: "https://www1.racgp.org.au/getattachment/de6f8e46-91e0-4207-beb6-de5b180e5640/attachment.aspx",
    },
    {
      title: "Skin Care",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRvVz9wNc2oaRZLGJNe6DaR9i8f5QnhslxYw&s",
    },

  ];


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div
            key={index}
            className="cursor-pointer p-4"
            onClick={() => navigate(`/products?category=${encodeURIComponent(category.title)}`)}
          >
            <div className="rounded-lg border bg-white p-4 shadow hover:shadow-lg">
              <img
                src={category.img}
                alt={category.title}
                className="mx-auto mb-2 h-24 w-24 object-cover"
              />
              <p className="text-center font-medium">{category.title}</p>
            </div>
          </div>
        ))}
      </Slider>
  );
};

export default CategorySlider;
