const ITEMPERPAGE = 5 

function paginate(users, pageNumber) {
    let paginate = {}
    let startingItem = (pageNumber - 1) * ITEMPERPAGE
    let lastItem = pageNumber * ITEMPERPAGE
    let paginatedUsers = users.slice(startingItem, lastItem)
    
    paginate.users = paginatedUsers
    console.log('users.legth ' + users.length)
    console.log('ITEMPERPAGE ' + ITEMPERPAGE)
    paginate.totalPages = Math.round(users.length / ITEMPERPAGE)
    if(paginate.totalPages == 0) paginate.totalPages = 1
    paginate.pagenumber = pageNumber
    
    return paginate
}

export { paginate }