import { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, toggle };
}
