import React from "react";
import { Bot } from "lucide-react";


function LoadingIndicator({ darkMode }) {
    return (
        <div className="flex justify-start">
            <div
                className={`${darkMode
                    ? "bg-gray-800 text-gray-100 border border-gray-700"
                    : "bg-white text-gray-800 shadow-md"
                    } rounded-2xl px-5 max-w-[80%] md:max-w-[70%]`}
            >
                <div className="flex items-center space-x-3">
                    <Bot
                        className={`h-5 w-5 ${darkMode ? "text-indigo-400" : "text-indigo-600"
                            }`}
                    />
                    <div className="flex space-x-1">
                        <div className={`w-2.5 h-2.5 ${darkMode ? "bg-gray-500" : "bg-indigo-400"}
                        rounded-full animate-bounce`} style={{ animationDelay: "0s" }}></div>
                        <div className={`w-2.5 h-2.5 ${darkMode ? "bg-gray-500" : "bg-indigo-400"}
                        rounded-full animate-bounce`} style={{ animationDelay: "150s" }}></div>
                        <div className={`w-2.5 h-2.5 ${darkMode ? "bg-gray-500" : "bg-indigo-400"}
                        rounded-full animate-bounce`} style={{ animationDelay: "300s" }}></div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoadingIndicator;