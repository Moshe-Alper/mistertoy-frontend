import React from "react"
import { AppLoader } from "../cmps/AppLoader.jsx"


export function LoaderWrapper({ children, isLoading }) {
    return (
        <React.Fragment>
            {isLoading
                ? <AppLoader />
                : children
            }
        </React.Fragment>
    )
}