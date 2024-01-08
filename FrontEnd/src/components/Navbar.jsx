/* eslint-disable no-unused-vars */
import React from "react";

export default function NavBar(){

    return(
        <nav className="w-full h-24 bg-black flex flex-row justify-between items-center px-24 py-12">
            <button className="bg-primary-color w-36 h-12 border-2 border-white rounded">
                <h1 className="text-lg font-bold">ReminDuck</h1>
            </button>
            <div>
                <button className="w-16 h-16 rounded-full bg-white border-2 border-primary-color">

                </button>
                <button className="w-16 h-16 rounded-full bg-white border-2 border-primary-color ml-16">

                </button>
            </div>
        </nav>
    )
}