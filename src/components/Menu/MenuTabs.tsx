"use client";

import { useState, useEffect } from "react";
import { useGetLocale } from "@/config";
import RadioButton from "../ui/RadioButton";
import clsx from "clsx";
import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MenuTabs {
  tabs: Category[];
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: string;
}

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowWidth;
}

const MenuTabs: React.FC<MenuTabs> = ({
  tabs,
  selectedTab,
  setSelectedTab,
}) => {
  const t = useTranslations("Home.Menu");
  const windowWidth: number = useWindowWidth();
  const locale = useGetLocale();
  // console.log(tabs);

  return (
    <>
      {windowWidth >= 768 ? (
        <div className="w-full mt-6">
          <div className="py-3 w-fit">
            <span className="text-dark font-lato text-sm sm:text-md uppercase tracking-wide whitespace-nowrap cursor-default">
              {t("categories")}
            </span>
          </div>
          <ul className="flex flex-col mt-3 gap-3 transition-all duration-200">
            {tabs.map(tab => (
              <li className="flex items-center gap-3" key={tab._id}>
                <RadioButton
                  label={tab.title[locale]}
                  value={tab._id}
                  isSelected={selectedTab === tab._id}
                  onRadioChange={() => setSelectedTab(tab._id)}
                  groupName="categories"
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="md:hidden mt-4">
          <Select defaultValue={selectedTab} onValueChange={setSelectedTab}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {tabs.map((tab, index) => (
                  <SelectItem
                    key={tab._id}
                    value={tab._id}
                    className={clsx({
                      "selected-tab": selectedTab === tab._id,
                    })}
                  >
                    {tab.title[locale]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
    </>
  );
};

export default MenuTabs;

{
  /* <ul className="flex gap-2 w-full overflow-x-scroll mt-4">
          {tabs.map((tab, index) => (
            <li
              key={tab._id}
              onClick={() => setSelectedTab({ value: tab._id, index })}
              className={`whitespace-nowrap ${
                selectedTab === index ? "selected" : ""
              } }`}
            >
              {tab.title[locale]}
            </li>
          ))}
        </ul> */
}
