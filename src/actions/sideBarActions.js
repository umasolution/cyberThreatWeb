const setSelectedSideBarItem = (selectedItem) => {
    return {
        type : "setSideBarSelectedItem",
        payload : selectedItem
    }
}


export {setSelectedSideBarItem}