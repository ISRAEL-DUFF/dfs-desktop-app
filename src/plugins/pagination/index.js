import Pagination from './Pagination'
let PaginationPlugin = {}

PaginationPlugin.install = function(app, options) {

    // let jsList = options.jsList || {}
    console.log(options)
    let inited = false
    
    if(!inited) {
        console.log('Initing pagination Plugin')

        inited = true
    }

    app.component('Pagination', Pagination)
}

export default PaginationPlugin