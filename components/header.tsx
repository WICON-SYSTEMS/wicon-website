"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const OPEN_DELAY = 60; // ms
  const CLOSE_DELAY = 180; // ms

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openDropdown = (name: string) => {
    clearCloseTimer();
    // small open intent delay to avoid accidental flickers
    window.setTimeout(() => setActiveDropdown(name), OPEN_DELAY);
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveDropdown(null);
    }, CLOSE_DELAY) as unknown as number;
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    {
      name: "Solutions",
      dropdown: [
        {
          name: "Products",
          href: "/products",
          description: "Hardware & Technology",
        },
        {
          name: "Services",
          href: "/services",
          description: "Installation & Support",
        },
      ],
    },
    {
      name: "Learning",
      dropdown: [
        {
          name: "Training Program",
          href: "/training",
          description: "WiCon Training Program",
        },
        {
          name: "2024 Training Program",
          href: "/training/2024",
          description: "WiCon 2024 Training Program",
        },
        { name: "Blog", href: "/blog", description: "Industry Insights" },
      ],
    },
    {
      name: "Join Us",
      dropdown: [
        { name: "Careers", href: "/careers", description: "Work With Us" },
        {
          name: "Become a volunteer",
          href: "/training#volunteer-registration",
          description: "Teach & Inspire",
        },
      ],
    },
    { name: "Contact", href: "/contact" },
  ];

  const handleMouseEnter = (itemName: string) => openDropdown(itemName);
  const handleMouseLeave = () => scheduleClose();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-10 sm:h-12 flex items-center mr-3">
                <img
                  src="/wicon-body.png"
                  alt="WiCon Systems Logo"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.dropdown && handleMouseEnter(item.name)
                }
                // Do not close on leaving the wrapper; we'll handle closing on trigger/panel leave with delay
              >
                {item.dropdown ? (
                  <div
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-black cursor-pointer transition-colors"
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    aria-expanded={activeDropdown === item.name}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    onMouseLeave={handleMouseLeave}
                    onFocus={() => handleMouseEnter(item.name)}
                    onBlur={handleMouseLeave}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        if (activeDropdown === item.name) {
                          setActiveDropdown(null);
                        } else {
                          openDropdown(item.name);
                        }
                      }
                      if (e.key === "Escape") {
                        setActiveDropdown(null);
                      }
                    }}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4 ml-1" />
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    className="text-gray-700 hover:text-black px-4 py-2 text-sm font-medium transition-colors block"
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.name && (
                  <div
                    className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    role="menu"
                    onMouseEnter={clearCloseTimer}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="py-2">
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                          role="menuitem"
                          onFocus={clearCloseTimer}
                          onBlur={handleMouseLeave}
                        >
                          <div className="font-medium text-gray-900">
                            {dropdownItem.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {dropdownItem.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-1" />
              <span>+237 674802971</span>
            </div> */}
            <Link href="/contact">
              <Button className="rounded-lg bg-black text-white hover:bg-gray-800">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-black p-2"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <div className="px-3 py-2 text-base font-medium text-gray-900 border-b border-gray-100">
                        {item.name}
                      </div>
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-6 py-2 text-sm text-gray-700 hover:text-black hover:bg-gray-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href!}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="px-3 py-2 border-t border-gray-200 mt-2">
                {/* <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Phone className="w-4 h-4 mr-1" />
                  <span>+237 674802971</span>
                </div> */}
                <Link href="/contact">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
