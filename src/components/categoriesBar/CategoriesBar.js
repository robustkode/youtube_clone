import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./_categoriesBar.scss";

import {
  getPopularVideos,
  getVideosByCategory,
} from "../../store/actions/videoAction";
import { useNavigate } from "react-router-dom";

const keywords = [
  "All",
  "React js",
  "Angular js",
  "Typescript",
  "React Native",
  "use of API",
  "Redux",
  "Algorithm",
  "Coding",
  "Firebase",
  "Football",
  "Python",
  "Javascript",
  "HTML",
  "CSS",
  "Bootstrap",
  "Tailwind",
  "Next Js",
  "Sport",
  "Soccer",
  "Economics",
  "History",
];

const CategoriesBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeCat, setActiveCat] = useState("All");

  const handleClick = (value) => {
    setActiveCat(value);
    if (value === "All") {
      dispatch(getPopularVideos());
    } else {
      navigate(`/search/${value}`);
    }
  };

  return (
    <div className="categoriesBar w-100 py-2">
      {keywords.map((value, i) => (
        <span
          onClick={() => handleClick(value)}
          key={i}
          className={activeCat === value ? "active" : ""}
        >
          {value}
        </span>
      ))}
    </div>
  );
};

export default CategoriesBar;
