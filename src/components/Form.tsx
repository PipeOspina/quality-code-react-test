import React, { useContext, useState, useEffect } from 'react'
import { Form as BootstrapForm, Button } from 'react-bootstrap'
import Input, { TYPE_NUMBER, TYPE_SELECT } from '../components/Input'

import DataContext from '../context/dataContext'

import './Form.css'

const Form = () => {
    const [options, setOptions] = useState([''])
    const [errs, setErrs] = useState({
        value: false,
        select: false,
        trm: false
    })

    const context = useContext(DataContext)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!context.form.value || context.form.value === '' || context.form.value === '0') {
            setErrs({
                ...errs,
                value: true
            })
        } else if (!context.form.select || context.form.select === 'Seleccione...') {
            setErrs({
                ...errs,
                select: true
            })
        } else if (!context.form.trm || context.form.trm === '' || context.form.trm === '0') {
            setErrs({
                ...errs,
                trm: true
            })
        } else {
            setErrs({
                value: false,
                select: false,
                trm: false
            })
            context.addData(context.form)
            context.resetForm()
        }
    }

    useEffect(() => {
        setOptions([
            'Prueba',
            'Prueba1',
            'Prueba2'
        ])
    }, [context.data])

    return <>
        <BootstrapForm className={`form ${context.data && context.data.length === 0 ? 'alone' : ''}`} onSubmit={handleSubmit}>
            <Input
                id='value'
                placeholder='Valor'
                type={TYPE_NUMBER}
                label='Valor'
                err={errs.value}
            />
            <Input
                id='select'
                type={TYPE_SELECT}
                label='Descripción'
                options={options}
                err={errs.select}
            />
            <Input
                id='trm'
                placeholder='TRM'
                type={TYPE_NUMBER}
                label='TRM'
                err={errs.trm}
            />
            <Button
                type='submit'
                className='submit'
            >
                Agregar
            </Button>
        </BootstrapForm>
    </>
}

export default Form