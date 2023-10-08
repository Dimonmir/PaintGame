export const hasTargetValue = (arr: Array<any>, target: string) =>{
    let flag = true;
    if (arr.length === 0){
        flag = false;
    } else {
        arr.map((obj) => {
            for (const [key, value] of Object.entries(obj)) {
                if (value === target) {
                    flag = false;
                }
            }
        });
    }
    return flag;
} 