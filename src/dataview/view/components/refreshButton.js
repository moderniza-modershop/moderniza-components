import React from 'react'
import { Button } from "primereact/button"

const refreshButton = (onRefresh, refreshOptions) => {
    return (
        <Button
            type={refreshOptions.type}
            label={refreshOptions.label}
            icon={refreshOptions.icon}
            size={refreshOptions.size}
            severity={refreshOptions.severity}
            className={refreshOptions.className}
            style={refreshOptions.style}
            rounded={refreshOptions.rounded}
            raised={refreshOptions.raised}
            onClick={(event) => { onRefresh(event) }}
        />
    )
}

export default refreshButton