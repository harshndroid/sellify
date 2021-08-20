export function setSelectedItems(data) {
    return{
        type: 'SET_SELECTED_ITEMS',
        payload: data
    }
}
export function resetSelectedItems(data) {
    return{
        type: 'RESET_SELECTED_ITEMS',
        payload: data
    }
}
