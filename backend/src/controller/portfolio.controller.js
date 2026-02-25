const portfolioService = require("../services/portfolio.service")

class PortfolioController {
    async getPortfolioBySlug(req, res, next) {
        try{
            const {slug} = req.params

            const portfolio = await portfolioService.findPublicPortfolioBySlug(slug)

            res.json({
                data: portfolio,
                message: "Successfully fetched all portfolio data of " + slug,
                status: "ok" 
            })
        }catch(exception){
            next(exception)
        }
    }

    async getAllPortfolioForSuperAdmin(req, res, next) {
        try{
            console.log("inside controller")

            const allPortfolio = await portfolioService.findAllPortfolioForSuperAdmin()

            res.json({
                data: allPortfolio,
                message: "Successfully fetched all portfolio ",
                status: "ok" 
            })
        }catch(exception){
            next(exception)
        }
    }

    async createPortfolio(req, res, next) {
        try{
            const checkPortfolio = await portfolioService.findSingleRowByFilter({slug: req.body.slug})

            if(checkPortfolio){
                throw{
                    code: 400,
                    message: req.body.slug + " username already exists",
                    status: "SLUG_ALREADY_EXISTS_ERR"
                }
            }

            const data = await portfolioService.transformForCreate(req)

            const portfolio = await portfolioService.create(data)

            // console.log(req.loggedInUser.id)
            res.json({
                data: portfolio,
                message: `Portfolio created successfully`,
                status: "ok"
            })
        }catch(exception){
            next(exception)
        }
    }

    async updatePortfolio(req, res, next){
        try{
            const portfolioId = req.params.portfolio_id

            const checkPortfolio = await portfolioService.findSingleRowByFilter({id: portfolioId})

            // check portfolio is available or not
            if(!checkPortfolio){
                throw{
                    code: 404,
                    message: "Could not find any portfolio with that portfolio id",
                    status: "PORTFOLIO_NOT_FOUND_ERR"
                }
            }

            const data = req.body

            // check slug already exists or not
            if(data.slug){
                const checkSlug = await portfolioService.findSingleRowByFilter({slug: data.slug})
                
                if(checkSlug){
                    console.log('hi', data.slug, checkPortfolio.slug)
                    throw({
                        data: null,
                        message: data.slug + " slug has already used",
                        status: "SLUG_ALREADY_USED_ERR"
                    })
                }
            }

            // update portfolio
            const portfolio = await portfolioService.updateSingleRowByFilter(data, {id: portfolioId})

            res.json({
                data: portfolio,
                message: "Portfolio updated successfully",
                status: 'ok' 
            })
        }catch(exception){
            next(exception)
        }
    }

    async deletePortfolio(req, res, next){
        try{
            const portfolioId = req.params.portfolio_id
            const deleteCount = await portfolioService.deleteSingleRowByFilter({id: portfolioId})

            res.json({
                data: null,
                message: deleteCount + " Portfolio has been deleted successfully",
                status: 'ok'
            })
        }catch(exception){
            next(exception)
        }
    }
}

module.exports = new PortfolioController()