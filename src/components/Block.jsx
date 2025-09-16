import '../App.css'
import {useContext} from 'react'
import FieldContext from '../FieldContext'

function Block({x, y, color}) {
    let fieldsSettings = useContext(FieldContext)

    return <div style={{
        width: fieldsSettings.step, 
        height: fieldsSettings.step, 
        backgroundColor: color,
        transform: `translate(
            ${x * fieldsSettings.step}px, 
            ${y * fieldsSettings.step}px)`
        }} className='field_block'
    ></div>
}

export default Block