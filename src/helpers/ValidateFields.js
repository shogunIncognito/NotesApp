export function validateSame(values, note) {
    return Object.keys(values).every(key => values[key] === note[key])
}