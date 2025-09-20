import React from "react";

interface LoaderProps {
    size?: "sm" | "md" | "lg";
    text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = "md", text }) => {
    const sizeClasses = {
        sm: "w-4 h-4",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className="flex flex-col items-center justify-center gap-3">
            <div
                className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-slate-300 border-t-blue-600`}
            ></div>
            {text && <p className="text-slate-600 text-sm">{text}</p>}
        </div>
    );
};
