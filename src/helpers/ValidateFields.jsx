export function validateEmpty(values) {
    for (const key in values) {
        if (key != 'id') {
            if (values[key].trim() === '') return true
        }
    }
    return false
}

export function validateSame(values, note) {
    return Object.keys(values).every(key => values[key] === note[key])
}