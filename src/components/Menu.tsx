"use client";

import { FC, useEffect, useState, useRef } from "react";
import Image from "next/image";

// Group the items by category
const groupByCategory = (items: any[]) => {
  return items.reduce((result: any, item) => {
    (result[item.category] = result[item.category] || []).push(item);
    return result;
  }, {});
};

const MenuPage: FC = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("Tamdyr");

  const categories = ["Tamdyr", "Kebab", "Salads", "Soups", "Desserts"];

  // Create refs for each category section
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const menuItems = [
    // Tamdyr category
    {
      id: 1,
      name: "Guzyňyň gapyrgalary",
      time: "25min",
      price: "55.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Tamdyr",
    },
    {
      id: 2,
      name: "Güweçde guzy eti",
      time: "25min",
      price: "55.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Tamdyr",
    },
    {
      id: 3,
      name: "Guzyň ýeke gapyrgasy",
      time: "30min",
      price: "60.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Tamdyr",
    },
    {
      id: 4,
      name: "Towuk rulony",
      time: "25min",
      price: "45.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Tamdyr",
    },

    // Kebab category
    {
      id: 6,
      name: "Guzyňyň egni",
      time: "25min",
      price: "55.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Kebab",
    },
    {
      id: 7,
      name: "Towuk kebaby",
      time: "20min",
      price: "40.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Kebab",
    },
    {
      id: 8,
      name: "Dana kebaby",
      time: "30min",
      price: "65.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Kebab",
    },
    {
      id: 9,
      name: "Garryyşly kebab",
      time: "25min",
      price: "60.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Kebab",
    },

    // Salads category
    {
      id: 11,
      name: "Çoban salaty",
      time: "15min",
      price: "25.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Salads",
    },
    {
      id: 12,
      name: "Grik salaty",
      time: "15min",
      price: "30.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Salads",
    },
    {
      id: 13,
      name: "Balykly salat",
      time: "20min",
      price: "45.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Salads",
    },

    // Soups category
    {
      id: 14,
      name: "Pomidorly çorba",
      time: "25min",
      price: "35.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Soups",
    },
    {
      id: 15,
      name: "Balyk çorbasy",
      time: "30min",
      price: "50.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Soups",
    },
    {
      id: 16,
      name: "Etli çorba",
      time: "20min",
      price: "40.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Soups",
    },

    // Desserts category
    {
      id: 17,
      name: "Süýji çörek",
      time: "15min",
      price: "20.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Desserts",
    },
    {
      id: 18,
      name: "Baklava",
      time: "10min",
      price: "30.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Desserts",
    },
    {
      id: 19,
      name: "Gyzyl güller",
      time: "20min",
      price: "35.00 manat",
      image: "https://via.placeholder.com/200x150",
      category: "Desserts",
    },
  ];

  useEffect(() => {
    const activeCategoryElement = document.querySelector(
      `.category-${activeCategory}`
    );
    if (activeCategoryElement) {
      activeCategoryElement.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeCategory]);

  // Sticky menu logic
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 150) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Check active category based on scroll position
      const categoryPositions = Object.keys(categoryRefs.current).map(
        (category) => {
          const ref = categoryRefs.current[category];
          return {
            category,
            offsetTop: ref ? ref.offsetTop : 0,
          };
        }
      );

      const scrollPosition = window.scrollY + 200; // Offset to trigger active before reaching the section

      for (let i = 0; i < categoryPositions.length; i++) {
        const currentCategory = categoryPositions[i];
        const nextCategory = categoryPositions[i + 1];

        if (
          scrollPosition >= currentCategory.offsetTop &&
          (!nextCategory || scrollPosition < nextCategory.offsetTop)
        ) {
          setActiveCategory(currentCategory.category);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to category when clicked
  const handleCategoryClick = (category: string) => {
    const categoryElement = categoryRefs.current[category];
    if (categoryElement) {
      categoryElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Group menu items by category
  const groupedItems = groupByCategory(menuItems);

  return (
    <div className="bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-green-900 text-white">
        <div className="flex items-center">
          <Image
            src="https://via.placeholder.com/100x50"
            alt="Rahat Bistro"
            width={100}
            height={50}
          />
        </div>
        <button className="text-xl">☰</button>
      </header>

      {/* Banner */}
      <div className="p-4">
        <Image
          src="https://via.placeholder.com/500x200"
          alt="Tamdyr Banner"
          width={500}
          height={200}
          className="rounded-lg"
        />
      </div>

      {/* Category Menu - Sticky and Scrollable */}
      <div
        className={`w-full bg-white py-2 ${
          isSticky ? "sticky top-0 z-50" : ""
        }`}
      >
        <div className="flex overflow-x-auto space-x-4 px-4 scrollbar-hide">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`whitespace-nowrap text-center py-2 px-4 rounded-full cursor-pointer category-${category} ${
                activeCategory === category
                  ? "bg-green-900 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </div>

      {/* Menu Section - Grouped by Category */}
      <section className="p-4">
        {Object.keys(groupedItems).map((category) => (
          <div
            key={category}
            ref={(el) => (categoryRefs.current[category] = el)}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">{category}</h2>
            <div className="grid grid-cols-2 gap-4">
              {groupedItems[category].map((item: any) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.time}</p>
                  <p className="text-green-900 font-bold">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default MenuPage;
