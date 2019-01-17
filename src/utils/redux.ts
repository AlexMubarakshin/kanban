export function makeActionCreator(type: string, ...argNames: any[]) {
    return (...args: any[]) => {
        let action: any = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index];
        });
        return action;
    };
}