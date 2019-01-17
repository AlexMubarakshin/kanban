
export const getHighestId = (obj: { [i: number]: any }): number => {
    const result = Math.max(...Object.keys(obj).map((key) => parseInt(key, 10)));
    if (result === -Infinity) {
        return -1;
    }
    return result;
};