import React from 'react'
import { Button } from 'primereact/button'

/**
 * 
 * @param {Function} onExpandAll
 * @param {Function} onCollapseAll
 * @param {Object} expandOptions
 * @returns 
 */
const expandButton = (onExpandAll, onCollapseAll) => {
    return (
        <div className='p-buttonset'>
            <Button
                size="small"
                icon="pi pi-plus"
                severity="primary"
                outlined={true}
                onClick={() => {
                    onExpandAll()
                }}
            />
            <Button
                size="small"
                icon="pi pi-minus"
                severity="primary"
                outlined={true}
                onClick={() => {
                    onCollapseAll()
                }}
            />
        </div>
    )
}

export default expandButton