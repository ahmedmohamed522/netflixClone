import React, { useEffect, useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { UserAuth } from "../context/auth-context";
import { AiOutlineClose } from "react-icons/ai";

const SavedShows = () => {
    const sliderRef = useRef();
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();
    const slideLeft = () => {
        var slider = sliderRef.current;
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = sliderRef.current;
        slider.scrollLeft = slider.scrollLeft + 500;
    };
    useEffect(() => {
        onSnapshot(doc(db, "users", `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        });
    }, [user?.email]);

    const movieRef = doc(db, "users", `${user?.email}`);
    const deleteShow = async (passedId) => {
        try {
            const result = movies.filter((item) => item.id !== passedId);
            await updateDoc(movieRef, { savedShows: result });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <h2 className="text-white font-bold md:text-xl p-4">My Shows</h2>
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
                    {movies?.map((item, id) => {
                        return (
                            <div
                                key={id}
                                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2"
                            >
                                <img
                                    className="w-full h-auto block"
                                    src={`https://image.tmdb.org/t/p/w500${item?.img}`}
                                    alt={item?.title}
                                />
                                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                                    <p className="white-space-normal text-[10px] sm:text-xs md:text-sm font-bold flex justify-center items-center h-full w-full text-center">
                                        {item?.title}
                                    </p>
                                    <p
                                        onClick={() => deleteShow(item.id)}
                                        className="absolute text-gray-300 top-4 right-4"
                                    >
                                        <AiOutlineClose />
                                    </p>
                                </div>
                            </div>
                        );
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

export default SavedShows;
