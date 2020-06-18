import React, { KeyboardEvent, ChangeEvent, useState, useContext, useEffect } from 'react'
import { Form, FormControl } from 'react-bootstrap'

import DataContext from '../context/dataContext'

import './Input.css'
import { formData } from '../context/types'
import { unformatNumber } from '../utils'

type Props = {
    id: string,
    err: boolean,
    placeholder?: string,
    type: string,
    auxText?: string,
    label?: string,
    value?: string,
    options?: string[]
}

type NumberInputProps = {
    id: string,
    err: boolean,
    placeholder: string
}

type SelectInputProps = {
    id: string,
    err: boolean,
    options: string[]
}

type SwitchInputProps = {
    id: string,
    err: boolean,
    placeholder: string,
    type: string,
    options?: string[]
}

const Input = (props: Props) => {
    return <>
        <Form.Group
            controlId={props.id}
            className='input'
        >
            {props.label && <Form.Label className='label'>{props.label}</Form.Label>}
            <SwitchInput
                id={props.id}
                placeholder={props.placeholder || ''}
                type={props.type}
                options={props.options}
                err={props.err}
            />
            {props.auxText && (
                <Form.Text>{props.auxText}</Form.Text>
            )}
        </Form.Group>
    </>
}

const NumberInput = (props: NumberInputProps) => {
    const [value, setValue] = useState('')
    const [key, setKey] = useState('')
    const [err, setErr] = useState(true)

    const context = useContext(DataContext)

    useEffect(() => {
        switch (props.id) {
            case 'value':
                setValue(context.form.value)
                break
            case 'trm':
                setValue(context.form.trm)
                break
            default:
                setValue('')
                break
        }
    }, [context.form])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (!isNaN(parseInt(key)) || (key === ',' && !value.includes(',')) || key === '') {
            const inputValue = event.target.value
            const number = unformatNumber(inputValue)

            if (isNaN(number)) return

            const numberFormat = Intl.NumberFormat('de-DE')

            let result;
            if ((key === ',' && inputValue[inputValue.length - 1] === ',') || key === '0') result = inputValue
            else result = numberFormat.format(number)

            const form: formData = {
                ...context.form,
                [props.id]: result
            }
            setErr(false)
            context.updateForm(form)
        }
        setKey('')
    }

    const handleKeyPressed = (event: KeyboardEvent<HTMLInputElement>) => {
        setKey(event.key)
    }

    const handleBlur = () => {
        setValue(value !== '0' ? value : '')
        console.log(!value || value === '' || value === '0', value)
        setErr(!value || value === '' || value === '0')
    }

    return <>
        <Form.Control
            isInvalid={props.err && err}
            type='text'
            placeholder={props.placeholder}
            value={value}
            onChange={handleChange}
            onKeyPress={handleKeyPressed}
            onBlur={handleBlur}
        />
        {props.err && err && (
            <Form.Text className='error'>Completa este campo</Form.Text>
        )}
    </>
}

const SelectInput = (props: SelectInputProps) => {
    const [value, setValue] = useState('')
    const [err, setErr] = useState(true)

    const context = useContext(DataContext)

    useEffect(() => {
        setValue(context.form.select)
        console.log(context.form.select)
    }, [context.form])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const form: formData = {
            ...context.form,
            [props.id]: event.target.value
        }
        context.updateForm(form)
        setErr(event.target.value === 'Seleccione...')
    }

    const handleBlur = (event: React.FocusEvent<HTMLSelectElement>) => {
        setErr(event.target.value === 'Seleccione...')
    }

    return <>
        <Form.Control
            isInvalid={props.err && err}
            onBlur={handleBlur}
            as="select"
            onChange={handleChange}
            value={value}
        >
            <option>Seleccione...</option>
            {props.options && props.options.map((option, index) =>
                <option
                    key={option}
                    id={`${props.id}-option-${index.toString()}`}
                >
                    {option}
                </option>
            )}
        </Form.Control>
        {props.err && err && (
            <Form.Text className='error'>Selecciona un valor</Form.Text>
        )}
    </>
}

const SwitchInput = (props: SwitchInputProps) => {
    switch (props.type) {
        case TYPE_SELECT:
            return <>
                <SelectInput
                    id={props.id}
                    options={props.options || []}
                    err={props.err}
                />
            </>
        case TYPE_NUMBER:
            return <>
                <NumberInput
                    id={props.id}
                    placeholder={props.placeholder}
                    err={props.err}
                />
            </>
        default:
            return <>
                <FormControl
                    type='text'
                    placeholder={props.placeholder}
                />
            </>
    }
}

export const TYPE_SELECT = 'select'
export const TYPE_NUMBER = 'number'

export default Input