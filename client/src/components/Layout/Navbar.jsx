import React from "react";
import styles from "../../styles/styles.js";
import { Link } from "react-router-dom";
import { navItems } from "../../static/data.js";
const Navbar = ({ active }) => {
  return (
    <div className={`${styles.normalFlex}`}>
      {navItems &&
        navItems.map((item, index) => (
          <div className="flex">
            <Link
              to={item.url}
              className={`${
                active === index + 1 ? "text-[#17dd1f]" : "text-[#fff]"
              } font-[500] px-6 cursor-pointer`}
            >
              {item.title}
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Navbar;
