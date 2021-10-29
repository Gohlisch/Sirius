/**
 * Returns a random generated string with characters allowed in generic
 * URIs according to RFC 3986 (https://tools.ietf.org/html/rfc3986#section-2.3)
 * @param {number} length - the length of the returned string
 * @returns {string}
 */
export function randomString(length: number): string {
    const urlAllowedChars = "ABCDEFGHIJKLNMOPQRSTUVWXYZabcdefghijklnmopqrstuvwxyz1234567890-_~."
    let string = "";

    for(let i = 0; i < length; ++i)
        string = string.concat(urlAllowedChars[Math.floor(urlAllowedChars.length*Math.random())]);

    return string;
}

/**
 * Returns a number for a given day. (Starts with "monday"=1 and ends with "sunday"=7)
 * If no day of the week was given -1 is returned.
 * @param {string} day
 * @returns {number}
 */
export function weekdayToNumber(day: string): number {
    switch (day.toLowerCase()) {
        case("monday"): return 1;
        case("tuesday"): return 2;
        case("wednesday"): return 3;
        case("thursday"): return 4;
        case("friday"): return 5;
        case("saturday"): return 6;
        case("sunday"): return 7;
        default: return -1;
    }
}

/**
 * The given Date is returned in an appropriate format
 * for the datetime attribute of HTMLTimeElement
 * @param date {Date}
 * @returns {string}
 */
export function toDateTimeFormat(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDay();

    return year.toString()
        + "-" + (month < 10 ? `0${month.toString()}` : month.toString())
        + "-" + (day < 10 ? `0${day.toString()}` : day.toString());
}

/**
 * @template T
 * @callback keyGeneratorFunction
 * @param T the object from whom the key is to be generated
 * @returns {string} generated key
 */

/**
 * Group the elements of an array by a generated key.
 * The grouped elements are stored inside arrays in an object
 * with the elements having the same key
 * @template T
 * @param array {Array<T>}
 * @param keyFunction {keyGeneratorFunction}
 * @returns {{}}
 */
export function groupBy<T>(array: Array<T>, keyFunction: (T)=>string): Record<string, unknown> {
    const groups = {};

    for(const x of array) {
        const key = keyFunction(x);
        if (!Object.hasOwnProperty.call(groups, key)) {
            groups[key] = [];
        }
        groups[key].push(x);
    }

    return groups
}
