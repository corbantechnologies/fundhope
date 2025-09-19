"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Plus, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = usePathname();

  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 hover:opacity-80 transition-smooth"
          >
            <div className="bg-gradient-primary p-2 rounded-lg">
              <Heart className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FundHope</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/campaigns"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive("/campaigns")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Browse Campaigns
            </Link>
            <Link
              href="/organizations"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive("/organizations")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              Organizations
            </Link>
            <Link
              href="/"
              className={`text-sm font-medium transition-smooth hover:text-primary ${
                isActive("/")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              How It Works
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* <Button variant="outline" size="sm" asChild>
              <Link href="/search">
                <Search className="w-4 h-4" />
                Search
              </Link>
            </Button> */}
            <Button variant="secondary" size="sm" asChild>
              <Link href="/">
                <Plus className="w-4 h-4" />
                Start Campaign
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link href="/campaigns">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 pt-2 border-t border-border mt-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/campaigns"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Campaigns
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Organizations
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/search" onClick={() => setIsMenuOpen(false)}>
                    <Search className="w-4 h-4" />
                    Search
                  </Link>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/" onClick={() => setIsMenuOpen(false)}>
                    <Plus className="w-4 h-4" />
                    Start Campaign
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/campaigns" onClick={() => setIsMenuOpen(false)}>
                    Donate Now
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
