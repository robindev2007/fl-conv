import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "./Container";

const NavList = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const Header = () => {
  return (
    <div>
      <header>
        <Container className="mx-auto">
          <nav className="flex items-center justify-between">
            <div className="text-lg font-bold">FlConverter</div>
            <ul className="flex space-x-4">
              {NavList.map((item) => (
                <li key={item.href}>
                  <Link prefetch href={item.href} className="hover:underline">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Button>Go Premium</Button>
          </nav>
        </Container>
      </header>
    </div>
  );
};

export default Header;
