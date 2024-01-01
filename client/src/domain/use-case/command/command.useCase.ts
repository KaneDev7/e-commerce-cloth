
export const commandsOfSelectedFilter = (commandsOfCurrentUser, filterSelected) =>{
    return [...commandsOfCurrentUser]
    .filter(item => item.attributes.statut === filterSelected.toLowerCase())
}