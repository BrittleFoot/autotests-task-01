const assert = require('assert');
const getPokerHand = require('../lib/getPokerHand');


function itShouldReturn(name) {
    return {
        for: combination => {
            const strCombination = "[" + combination.join(', ') + "]"

            it(`should return \`${name}\` for ${strCombination}`, () => {
                const actual = getPokerHand(combination);
                assert.strictEqual(actual, name);
            })
        }
    }
}


describe('getPokerHand', () => {

    describe('Positive', () => {
        itShouldReturn('Покер')         .for([1, 1, 1, 1, 1])
        itShouldReturn('Покер')         .for([6, 6, 6, 6, 6])

        itShouldReturn('Каре')          .for([1, 1, 1, 1, 2])
        itShouldReturn('Каре')          .for([1, 5, 1, 1, 1])

        itShouldReturn('Фулл хаус')     .for([1, 1, 1, 2, 2])
        itShouldReturn('Фулл хаус')     .for([6, 6, 1, 6, 1])

        itShouldReturn('Тройка')        .for([1, 1, 1, 2, 3])
        itShouldReturn('Тройка')        .for([1, 2, 1, 3, 1])

        itShouldReturn('Две пары')      .for([1, 1, 2, 2, 3])
        itShouldReturn('Две пары')      .for([6, 6, 2, 1, 2])

        itShouldReturn('Пара')          .for([1, 2, 2, 3, 4])
        itShouldReturn('Пара')          .for([1, 2, 4, 3, 1])

        itShouldReturn('Наивысшее очко').for([1, 2, 3, 4, 5])
        itShouldReturn('Наивысшее очко').for([3, 2, 5, 1, 4])
    })

    describe('Negative', () => {
        it('should throw error when not an array in input', () => {
            const notArray = () => getPokerHand("[1, 2, 3, 4, 5]")
            assert.throws(notArray, /not Array/) 
        })
      
        it('should throw error when not 5 items in input', () => {
            const lessThan5 = () => getPokerHand([1, 2])
            const moreThan5 = () => getPokerHand([1, 2, 3, 4, 5, 6])
            assert.throws(lessThan5, /!= 5/) 
            assert.throws(moreThan5, /!= 5/) 
        })
        
        it('should throw error when any NaN in input', () => {
            const nanInInput = () => getPokerHand([10, "valet", "dama", "korol", "tyz"])
            assert.throws(nanInInput, /only numbers/)
        })

        it('should throw error when numbers not in range [1..6]', () => {
            const nanInInput = () => getPokerHand([10, 11, 12, 13, 14])
            assert.throws(nanInInput, /in range \[1\.\.6\]/)
        })
    })

});
