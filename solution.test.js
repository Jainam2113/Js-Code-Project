const solution = require('./solution');

describe('solution', () => {
    test('should handle complete week data', () => {
        const input = {
            '2020-01-01': 4,  // Wed
            '2020-01-02': 4,  // Thu
            '2020-01-03': 6,  // Fri
            '2020-01-04': 8,  // Sat
            '2020-01-05': 2,  // Sun
            '2020-01-06': -6, // Mon
            '2020-01-07': 2,  // Tue
            '2020-01-08': -2  // Wed
        };
        const expected = {
            'Mon': -6,
            'Tue': 2,
            'Wed': 2,
            'Thu': 4,
            'Fri': 6,
            'Sat': 8,
            'Sun': 2
        };
        expect(solution(input)).toEqual(expected);
    });

    test('should handle missing days with mean calculation', () => {
        const input = {
            '2020-01-01': 6,  // Wed
            '2020-01-04': 12, // Sat
            '2020-01-05': 14, // Sun
            '2020-01-06': 2,  // Mon
            '2020-01-07': 4   // Tue
        };
        const expected = {
            'Mon': 2,
            'Tue': 4,
            'Wed': 6,
            'Thu': 8,
            'Fri': 10,
            'Sat': 12,
            'Sun': 14
        };
        expect(solution(input)).toEqual(expected);
    });

    test('should handle single day entries for Mon and Sun', () => {
        const input = {
            '2020-01-05': 10, // Sun
            '2020-01-06': 20  // Mon
        };
        const expected = {
            'Mon': 20,
            'Tue': 15,
            'Wed': 15,
            'Thu': 15,
            'Fri': 15,
            'Sat': 15,
            'Sun': 10
        };
        expect(solution(input)).toEqual(expected);
    });

    test('should handle large values within constraints', () => {
        const input = {
            '2020-01-05': 1000000, // Sun
            '2020-01-06': -1000000 // Mon
        };
        const expected = {
            'Mon': -1000000,
            'Tue': 0,
            'Wed': 0,
            'Thu': 0,
            'Fri': 0,
            'Sat': 0,
            'Sun': 1000000
        };
        expect(solution(input)).toEqual(expected);
    });

    test('should handle dates in different years', () => {
        const input = {
            '1970-01-01': 5,  // Thu
            '2100-01-02': 10  // Sat
        };
        const expected = {
            'Mon': 7,
            'Tue': 7,
            'Wed': 7,
            'Thu': 5,
            'Fri': 7,
            'Sat': 10,
            'Sun': 7
        };
        expect(solution(input)).toEqual(expected);
    });
});