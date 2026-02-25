const { PortfolioModel, PageModel, SectionModel } = require("../models")
const slugGenerator = require('../utilities/slugGenerator')

class PortfolioService {
    async transformForCreate(req){
        try{
            const data = req.body

            if(!data){
                throw({code: 400, message: "Payload is empty"})
            }

            if(!data.slug){
                data.slug = slugGenerator(req.loggedInUser.name)
            }

            data.user_id = req.loggedInUser.id 

            return data

        }catch(exception){
            throw exception
        }
    }

    async create(data) {
        try{
            let portfolio = await PortfolioModel.create(data)
            return portfolio
        }catch(exception){
            throw exception
        }
    }

    async updateSingleRowByFilter(data, filter) {
        try{
            let portfolio = await PortfolioModel.update(data, {
                where: filter,
                returning: true
            })
            return portfolio[1]
        }catch(exception){
            throw exception
        }
    }
    
    async findPublicPortfolioBySlug(slug) {
        try{
            const portfolio = await PortfolioModel.findOne({
                where: {slug, is_published: true},
                include: [
                    {
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
                    }
                ]
            })

            if(!portfolio){
                throw ({code: 404, message: "Portfolio not found"})
            }

            return portfolio
        }catch(exception){
            throw exception
        }
    }

    async findAllPortfolioForSuperAdmin() {
        try{
            const allPortfolio = await PortfolioModel.findAll({
                include: [
                    {
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
                    }
                ]
            })

            if(!allPortfolio){
                throw ({code: 404, message: "There is no any portfolio in database"})
            }

            return allPortfolio
        }catch(exception){
            throw exception
        }
    }

    async findSingleRowByFilter(filter){
        try{
            const result = await PortfolioModel.findOne({where: filter})
            return result
        }catch(exception){
            throw exception
        }
    }

    async deleteSingleRowByFilter(filter){
        try{
            const deleteCount = await PortfolioModel.destroy({where: filter})

            if(deleteCount === 0){
                throw({
                    code: 404,
                    message: "Portfolio not found while deleting",
                    status: "PORTFOLIO_NOT_FOUND_ERR"
                })
            }
            return deleteCount
        }catch(exception){  
            throw exception
        }
    }
    
}

module.exports = new PortfolioService()