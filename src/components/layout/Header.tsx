import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Header: React.FC = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isNavOpen) {
        setIsScrolled(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isNavOpen]);

  useEffect(() => {
    document.body.style.overflow = isNavOpen ? "hidden" : "";
  }, [isNavOpen]);

  const navItems = [
    { label: "About", path: "#about" },
    { label: "Product", path: "#product" },
    { label: "Studio", path: "#studio" },
    { label: "Pricing", path: "#pricing" },
    { label: "Documentation", path: "https://aithereum-protocol.gitbook.io/docs/" },
  ];

  const handleNavigation = (path: string) => {
    setIsNavOpen(false);
    if (!path.startsWith("#")) {
      router.push(path).then();
    }
  };

  const headerBg = isNavOpen
    ? "bg-primary-900 shadow-lg"
    : isScrolled
    ? "bg-primary-900 bg-opacity-90 shadow-lg"
    : "bg-transparent";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${headerBg}`}
      >
        <nav className="px-4 lg:px-10 py-3">
          <div className="flex justify-between items-center max-w-screen-xl mx-auto relative">
            <button
              onClick={() => router.push("/")}
              className="flex items-center space-x-2 w-auto h-8 md:h-10"
            >
              <div className="relative w-8 h-8 md:w-10 md:h-10">
                <Image
                  src="/icon.png"
                  alt="Aithereum Logo"
                  fill
                  sizes="(max-width: 768px) 32px, (max-width: 1200px) 40px, 48px"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
              <span className="text-white font-semibold text-xl md:text-2xl">
                Aithereum
              </span>
            </button>

            <div className="block md:hidden">
              <GiHamburgerMenu size={24} onClick={() => setIsOpen(true)} />
            </div>

            <motion.div
              initial={{ x: 500 }}
              animate={{ x: isOpen ? 0 : 500 }}
              className="md:hidden absolute inset-0 flex items-center px-7 h-screen w-full bg-black"
            >
              <IoCloseSharp
                className="absolute top-5 right-5"
                size={30}
                onClick={() => setIsOpen(false)}
              />
              <ul className="flex flex-col gap-10 text-4xl">
                {navItems.map((item) => (
                  <li key={item.label}>
                    {item.path.startsWith("http") ? (
                      <a
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-semibold md:text-md lg:text-lg hover:text-accent-500 transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.path}
                        className="text-white font-semibold md:text-md lg:text-lg hover:text-accent-500 transition-colors"
                        onClick={() => handleNavigation(item.path)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex space-x-2 md:space-x-6">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.path.startsWith("http") ? (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-semibold text-sm md:text-md lg:text-lg hover:text-accent-500 transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.path}
                      className="text-white font-semibold text-sm md:text-md lg:text-lg hover:text-accent-500 transition-colors"
                      onClick={() => handleNavigation(item.path)}
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
