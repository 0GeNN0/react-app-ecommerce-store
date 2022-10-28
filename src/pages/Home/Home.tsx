// Libs
import { useState } from "react";
import { useMediaQuery } from "react-responsive";

// Components
import Products from "../../components/Products/Products";
import SideBar from "../../components/SideBar/SideBar";

// Styles
import "./home.scss";

function Home() {
  const [isShown, setIsShown] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 52rem)" });

  function toggleSidebar(): void {
    setIsShown((prev: boolean) => !prev);
  }

  return (
    <main className="home">
      {!isTabletOrMobile && <SideBar isShown={isShown} />}
      <Products
        toggleSidebar={toggleSidebar}
        isTabletOrMobile={isTabletOrMobile}
      />
    </main>
  );
}

export default Home;
