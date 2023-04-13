import { ReactNode, useState } from "react";
import ControlBar from "../components/ControlBar";

import { FaBars, FaAngleLeft } from "react-icons/fa";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const [isShowBar, setIsShowBar] = useState<boolean>(false);
  return (
    <div className="flex justify-between h-[100vh] relative">
      <div
        className={`w-full h-[100vh] z-10 absolute md:relative md:w-[200px] lg:w-[250px] duration-100 ${
          isShowBar
            ? "translate-x-0"
            : "translate-x-full md:block md:-translate-x-[150px] lg:translate-x-0"
        }`}
      >
        <ControlBar setIsShowBar={setIsShowBar} isShowBar={isShowBar} />
      </div>
      <div
        className={`flex-1 px-4 py-5 h-[100vh] overflow-y-auto duration-100 relative ${
          isShowBar
            ? "hidden md:block"
            : "md:-translate-x-[150px] lg:translate-x-0"
        }`}
      >
        <div
          className="md:hidden absolute top-5 right-2 text-lg hover:cursor-pointer"
          onClick={() => setIsShowBar(!isShowBar)}
        >
          <FaBars />
        </div>
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
