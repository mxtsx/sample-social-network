export function arraysAreEqual(state: any, action: any){
    return !(state.sort() > action.sort() || state.sort() < action.sort())
}