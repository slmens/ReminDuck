/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEllipsis,faCalendarDays} from "@fortawesome/free-solid-svg-icons"


export default function CallReminderCard(props){
    return(
        <div className="bg-white w-96 h-40 rounded-2xl p-6 border-4 border-primary-color flex flex-col items-center justify-around">
            <div className="flex justify-between items-center mb-4 w-full">
                <h1 className="text-xl font-bold">{props.header}</h1>
                <button>
                    <FontAwesomeIcon icon={faEllipsis} className="text-3xl"/>
                </button>
            </div>
            <div className="w-full">
                <p className="text-sm mb-8">{props.desc}</p>  
                <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <h2 className="ml-2 text-sm">{props.dateTime}</h2>
                </div>
            </div>
        </div>
    )
}