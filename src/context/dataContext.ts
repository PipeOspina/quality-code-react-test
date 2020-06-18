import { createContext } from 'react'
import { data, formData } from './types'

const DataContext = createContext({
    data: [{
        value: 0,
        select: '',
        trm: 0
    }],
    form: {
        value: '',
        select: '',
        trm: ''
    },
    addData: (data: formData) => { },
    resetForm: () => { },
    updateForm: (form: formData) => { },
    setData: (data: data[]) => { }
})

export default DataContext
