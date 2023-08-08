import { Dataview } from '@moderniza-components'
import sampleOptions from './model/options'
import React, { useState } from 'react'

const DataviewSample = () => {
    const [values, setValues] = useState(null)

    const testar = () =>{
        
        setValues(values.map((item)=>{
            item.price = 0
            return item
        }))

        console.log('vou pegar', values)
    }

    return (
        <React.Fragment>
            {
                console.log('values', values)
            }
            <button className="btn btn-primary" onClick={()=>{
                testar()
            }}>Testar</button>
            <Dataview options={sampleOptions} values={values} onChange={(newValues) => {
                if (newValues) {
                    setValues(newValues)
                }
            }} />
        </React.Fragment>
    )
}

export default DataviewSample