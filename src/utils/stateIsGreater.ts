export function arraysAreEqual(state: any, action: any){
    return !(state.sort() > action.sort() || state.sort() < action.sort())
}

// action.payload.messages.length - (state.messages.length - action.payload.messages.length)
