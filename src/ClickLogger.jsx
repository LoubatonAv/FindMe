import React, { useEffect } from "react";

export default function ClickLogger() {
  useEffect(() => {
    const handleClick = () => console.log("Document clicked!");
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      console.log("Click listener removed");
    };
  }, []);

  return <div>Click anywhere and watch the console.</div>;
}
