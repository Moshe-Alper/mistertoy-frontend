import React from "react";

export function LoaderWrapper({ children, isLoading }) {
    return (
        <React.Fragment>
            {isLoading
                ? <div>Loading....</div>
                : children
            }
        </React.Fragment>
    )
}