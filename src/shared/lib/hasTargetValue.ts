export const hasTargetValue = (arr: Array<any>, target: string) =>{
    return arr.some((obj) => {
        return obj.key1 === target;
    });
} 