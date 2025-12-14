"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { IoMoon, IoSunny } from "react-icons/io5";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={"secondary"}
      size={"icon"}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      {theme === "dark" ? <IoMoon /> : <IoSunny />}
    </Button>
  );
};

export default ThemeSwitcher;
