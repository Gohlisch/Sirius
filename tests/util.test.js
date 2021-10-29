const {weekdayToNumber} = require("../logic/util");
const {randomString} = require("../logic/util");

test("randomString: has the given length", () => {
    for(let i = 0; i < 255; ++i)
        expect(randomString(i).length).toBe(i);
});

test("randomString: return empty string if given length is negative", () => {
    expect(randomString(-1).length).toBe(0);
    expect(randomString(-255).length).toBe(0);
});

test("randomString: never returns equal strings", () => {
    /**@type {Array<string>}*/
    let randomStrings = [];

    for(let i = 0; i < 10000; ++i) {
        const generated = randomString(8);
        expect(randomStrings).not.toContain(generated);
        randomStrings.push(generated);
    }
});

test("randomString: only contains chars allowed in uri", () => {
    const forbiddenChars = /[!§$%&\\\/()=?+*#'üäöÜÄÖ"°^<>:ß,;`\[\]{}]+/;
    const generated = randomString(1000);

    expect(generated).not.toMatch(forbiddenChars);
});

test("randomString: only contains chars allowed in uri", () => {
    const forbiddenChars = /[!§$%&\\\/()=?+*#'üäöÜÄÖ"°^<>:ß,;`\[\]{}]+/;
    const generated = randomString(1000);

    expect(generated).not.toMatch(forbiddenChars);
});

test("weekdayToNumber: returns associated number for each day from 1 to 7", ()=>{
    expect(weekdayToNumber("monday")).toBe(1);
    expect(weekdayToNumber("tuesday")).toBe(2);
    expect(weekdayToNumber("wednesday")).toBe(3);
    expect(weekdayToNumber("thursday")).toBe(4);
    expect(weekdayToNumber("friday")).toBe(5);
    expect(weekdayToNumber("saturday")).toBe(6);
    expect(weekdayToNumber("sunday")).toBe(7);
});

test("weekdayToNumber: returns -1 if no weekday was provided", ()=>{
    expect(weekdayToNumber("birthday")).toBe(-1);
    expect(weekdayToNumber("")).toBe(-1);
});
