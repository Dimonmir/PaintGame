export const hasTargetValue = (arr: Array<any>, target: string) =>{
    let flag = false;
    if (arr.length === 0){
        flag = true;
    } else {
        arr.map((obj) => {
            for (const value of Object.values(obj)) {
                if (value === target) {
                    flag = true;
                }
            }
        });
    }
    return flag;
} 