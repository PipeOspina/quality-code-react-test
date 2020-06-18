export const unformatNumber = (number: string): number => {
    const numbers = number.split(',')
    const normalizeInt = numbers[0].replace(/\./gi, '')
    let normalizeDec = numbers[1] ? numbers[1].replace(/\./gi, '') : '0'

    if (normalizeInt.length >= 15) return NaN
    if (normalizeDec.length > 2) normalizeDec = normalizeDec.slice(0, 2)

    return parseFloat(`${normalizeInt}.${normalizeDec}`)
}


export const formatNumber = (number: number): string => {
    if (isNaN(number)) return '0'
    const numberFormat = Intl.NumberFormat('de-DE')
    return numberFormat.format(number)
}