import Pagination from './pagination/Pagination'
let PaginationPlugin = {}

PaginationPlugin.install = function(app, options) {

    // let jsList = options.jsList || {}
    console.log(options)
    let inited = false
    
    if(!inited) {
        console.log('Initing pagination')

        inited = true
    }

    app.component('Pagination', Pagination)
}

export default PaginationPlugin