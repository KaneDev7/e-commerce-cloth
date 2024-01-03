
export const commandsOfSelectedFilter = (commandsOfCurrentUser, filterSelected) => {
    return [...commandsOfCurrentUser]
        .filter(item => item.attributes.statut === filterSelected.toLowerCase())
}


export const getTotalPriceOfPaidCommands = (commands) => {
    commands.filter(item => item.attributes.statut === 'livré')
        .reduce((acc, item) => {
            return acc += (parseFloat(item?.attributes?.price) * parseFloat(item?.attributes?.quantity))
        }, 0)
}


export const  updateCommandsState = (commands, updateItem, id) => {
  const newCommandeState =  [...commands].map(command => {
        if (command.id === id) return {id, attributes: { ...updateItem }}
        else return command
    })
    return newCommandeState
}