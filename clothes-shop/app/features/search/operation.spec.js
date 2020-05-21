
import reducer from './reducers';
import types from './types';
import { refine } from "./operations";

describe('test search controlled refinement', () => {
    it('should add item to refinementList in empty input state', () => {
        const input = {
            'brand_name' : ['agile', 'algolia']
        };
        const state = {}

        expect(refine(input)).toEqual({
            refinementList: {
                'brand_name' : ['agile', 'algolia']
            }
        });
    });


    it('should add one and remove one from refinementList', () => {
        const input = {
        'brand_name' : ['agile', 'algolia']
        };
        const state = {
            refinementList : {
                'brand_name' : ['agile']
            }
        }

        expect(refine(input,state)).toEqual({
            refinementList: {
                'brand_name' : ['algolia']
            }
        });
    });

});
