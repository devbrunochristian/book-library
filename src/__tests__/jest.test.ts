import sum from '../sum'

beforeAll(async () => {
    console.log('Starting tests!');
});

describe('Sum tests', () => {
    test('Should return 10', () => {
        expect(sum(5, 5)).toBe(10)
    });


});