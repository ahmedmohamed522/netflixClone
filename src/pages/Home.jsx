import React from "react";
import Main from "../components/Main";
import Row from "../components/Row";
import { UserAuth } from "../context/auth-context";
import requests from "../Request";

const home = () => {
    const { user } = UserAuth();
    console.log(user);
    return (
        <>
            <Main />
            <Row title="UpComing" fetchUrl={requests.requestUpcoming} />
            <Row title="Popular" fetchUrl={requests.requestPopular} />
            <Row title="Trending" fetchUrl={requests.requestTrending} />
            <Row title="TopRated" fetchUrl={requests.requestTopRated} />
            <Row title="Horror" fetchUrl={requests.requestHorror} />
        </>
    );
};

export default home;
