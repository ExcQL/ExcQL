/**
 * @jest-environment jsdom
 */

import {
    sortExcelColumnLetters,
    sortTableToColumnMappingInput
} from '../client/components/Info Panel/InfoPanel';

describe('`sortExcelColumnLetters` unit test', () => {
    it('sorts successfully', () => {
        const sampleArray = [
            { 'table1': 'AA' },
            { 'table2': 'A' },
            { 'table3': 'Z' },
            { 'table4': 'D' },
            { 'table5': 'B' },
            { 'table6': 'GG' },
            { 'table7': 'CCC' }
        ];
        expect(sortExcelColumnLetters(sampleArray)).toEqual(
            [
                { table2: 'A' },
                { table5: 'B' },
                { table4: 'D' },
                { table3: 'Z' },
                { table1: 'AA' },
                { table6: 'GG' },
                { table7: 'CCC' }
            ]
        );
    });

    it('raises errors if duplicate column letter is encountered', () => {
        const sampleArrayWithDuplicateColumnLetter = [
            { 'table1': 'AA' },
            { 'table2': 'A' },
            { 'table3': 'Z' },
            { 'table4': 'D' },
            { 'table5': 'B' },
            { 'table6': 'GG' },
            { 'table7': 'D' },
            { 'table8': 'CCC' }
        ];
        expect(() => sortExcelColumnLetters(sampleArrayWithDuplicateColumnLetter)).toThrow(Error);
    });

    it('raises errors if column letter is not a string', () => {
        const sampleArrayWithMoreThanOneColumnLetter = [
            { 'table1': 'AA' },
            { 'table2': 'A' },
            { 'table3': 'Z' },
            { 'table4': ['D', 'F'] },
            { 'table5': 'B' },
            { 'table6': 'GG' },
            { 'table7': 'D' },
            { 'table8': 'CCC' }
        ];
        expect(() => sortExcelColumnLetters(sampleArrayWithMoreThanOneColumnLetter)).toThrow(Error);
    });
});

describe('`sortTableToColumnMappingInput` unit test', () => {
    it('returns expected output', () => {
        const sampleInput = [
            { mappingId: 1, tableName: 'table1', fileColumn: 'T' },
            { mappingId: 2, tableName: 'table2', fileColumn: 'A' },
            { mappingId: 3, tableName: 'table3', fileColumn: 'BB' },
        ];
        expect(sortTableToColumnMappingInput(sampleInput)).toEqual({ table2: 'A', table1: 'T', table3: 'BB' });
    });

    it('raise errors', () => {
        const sampleInput = [
            { mappingId: 1, tableName: 'table1', fileColumn: 'T' },
            { mappingId: 2, tableName: 'table2', fileColumn: 'A' },
            { mappingId: 3, tableName: 'table3', fileColumn: 'Z' },
            { mappingId: 3, tableName: 'table3', fileColumn: 'BB' },
        ];
        expect(() => sortTableToColumnMappingInput(sampleInput)).toThrow(Error);
    });
})