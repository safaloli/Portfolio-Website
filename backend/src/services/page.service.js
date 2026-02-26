const {SectionModel, PageModel, PortfolioModel } = require("../models")
const slugGenerator = require('../utilities/slugGenerator')

class PageService {
    async transformForCreate(req){
        try{
            const data = req.body
            const {portfolio_slug} = req.params

            if(!portfolio_slug){
                throw({code: 403, message: "Portfolio slug is missing", status: "PORTFOLIO_SLUG_MISSING_ERR"})
            }

            if(!data){
                throw({code: 400, message: "Payload is empty", status: "EMPTY_PAYLOAD_ERR"})
            }

            if(!data.slug){
                data.slug = slugGenerator(req.loggedInUser.name)
            }

            const portfolio = await PortfolioModel.findOne({
                where: {
                    slug: portfolio_slug,
                    user_id: req.loggedInUser.id
                }
            })

            if(!portfolio){
                throw ({
                    code: 404,
                    message: "Could not find any portfolio",
                    status: "PORTFOLIO_NOT_FOUND_ERR"
                })
            }

            data.portfolio_id = portfolio.id  


            return data

        }catch(exception){
            throw exception
        }
    }

    async create(data) {
        try{
            const checkPage = await this.findSingleRowByFilter({
                portfolio_id: data.portfolio_id,
                slug: data.slug
            })

            if(checkPage){
                throw{
                    code: 400,
                    message: data.slug + " slug already exists",
                    status: "SLUG_ALREADY_EXISTS_ERR"
                }
            }

            const page = await PageModel.create(data)
            return page
        }catch(exception){
            throw exception
        }
    }

    async updateSingleRowByFilter(data, filter) {
        try{
            let pages = await PageModel.update(data, {
                where: filter,
                returning: true
            })
            return pages[1]
        }catch(exception){
            throw exception
        }
    }

    async findAllPagesForAdmin(portfolio_id) {
        try{
            const allPages = await PageModel.findAll({
                where: {portfolio_id: portfolio_id},
                model: PageModel,
                as: 'pages',
                include: [
                    {
                        model: SectionModel,
                        where: {is_active: true},
                        required: false,
                        as: 'sections'
                    }
                ]
            })

            if(!allPages){
                throw ({code: 404, message: "There is no any pages in database"})
            }

            return allPages
        }catch(exception){
            throw exception
        }
    }

    async findSingleRowByFilter(filter){
        try{
            const result = await PageModel.findOne({where: filter})

            // if(!result){
            //     throw({
            //         code: 404,
            //         message: "Portfolio page didn't found with this id " + filter.id,
            //         status: "PORTFOLIO_PAGE_NOT_FOUND_ERR"
            //     })
            // }
            return result
        }catch(exception){
            throw exception
        }
    }

    async findPublicPageBySlug(slug) {
        try{
            const page = await PageModel.findOne({
                where: {slug, is_active: true},
                include: [
                    {
                        model: SectionModel,
                        where: {is_active: true},
                        required: false,
                        as: 'sections'
                    }
                ]
            })

            return page
        }catch(exception){
            throw exception
        }
    }

    async deleteSingleRowByFilter(filter){
        try{
            const deleteCount = await PageModel.destroy({where: filter})

            if(deleteCount === 0){
                throw({
                    code: 404,
                    message: "page not found while deleting",
                    status: "PAGE_NOT_FOUND_ERR"
                })
            }
            return deleteCount
        }catch(exception){  
            throw exception
        }
    }
    
}

module.exports = new PageService()