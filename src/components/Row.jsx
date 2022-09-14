import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "./Movie";

const Row = ({ title, fetchUrl }) => {
    const [movies, setMovies] = useState([]);
    const sliderRef = useRef();
    useEffect(() => {
        axios.get(fetchUrl).then((res) => {
            setMovies(res.data.results);
        });
    }, [fetchUrl]);

    const slideLeft = () => {
        var slider = sliderRef.current;
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = sliderRef.current;
        slider.scrollLeft = slider.scrollLeft + 500;
    };

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
            <div className="relative flex items-center group">
                <MdChevronLeft
                    className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
                    size={40}
                    onClick={slideLeft}
                />
                <div
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
                    ref={sliderRef}
                >
                    {movies.map((item, id) => {
                        return <Movie item={item} key={id} />;
                    })}
                </div>
                <MdChevronRight
                    className="bg-white rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block right-0"
                    size={40}
                    onClick={slideRight}
                />
            </div>
        </>
    );
};

export default Row;
