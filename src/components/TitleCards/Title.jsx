import React, { useEffect, useRef, useState } from "react";
import "./Title.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const Title = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMDU0OTc0NTY5YjRlNGUzM2M4ODlhNzY2M2VlNWIxZCIsIm5iZiI6MTczMzg0NzM1My41OTYsInN1YiI6IjY3NTg2OTM5MzY4ODQ1OWQ3NTg5YTY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ibXoa4epRCr4yXb9UOvhpCyWlOXQKOJsYPMFc8EM2qM",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`,
      options,
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path || card.poster_path}`}
                alt={card.original_title}
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Title;
