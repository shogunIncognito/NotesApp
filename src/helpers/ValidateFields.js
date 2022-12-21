export function validateEmpty(values) {    
    for (const key in values) {
        if (typeof values[key] === 'string') {
            if (values[key].trim() === '') return true
        }
    }
    return false
}

export function validateSame(values, note) {
    return Object.keys(values).every(key => values[key] === note[key])
}