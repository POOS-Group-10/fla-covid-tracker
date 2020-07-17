import React from 'react';
import '../App.css';
import { Link } from "react-router-dom";
import LoginHub from "./LoginHub";
import FLmap from './FL/FLmap.js';

const Home = () =>
{

    return(
        <div>
            <LoginHub />
            <h1>Your County:</h1>
            <script>
            </script>
            <h1>Confirmed Cases:</h1>
            <script>
            </script>
            <h1>Cases Today:</h1>
            <script>
            </script>
            <h1>Cases Yesterday:</h1>
        </div>
    );
}

export default Home;
