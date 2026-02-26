const pageService = require("../services/page.service")
const portfolioService = require("../services/portfolio.service")

class PageController {
    async getPageBySlug(req, res, next) {
        try{
            const {page_slug, portfolio_slug} = req.params

            if(!portfolio_slug) {
                throw({
                    code: 500,
                    message: "Portfolio slug is empty",
                    status: "PORTFOLIO_SLUG_EMPTY_ERR"
                })
            }
            
            if(!page_slug) {
                throw({
                    code: 500,
                    message: "Portfolio > Page slug is empty",
                    status: "PAGE_SLUG_EMPTY_ERR"
                })
            }
            const portfolio = await portfolioService.findSingleRowByFilter({slug: portfolio_slug})

            if(!portfolio){
                throw ({code: 404, message: "Portfolio could not found", status: "PORTFOLIO_NOT_FOUND_ERR"})
            }

            const page = await pageService.findPublicPageBySlug(page_slug)

            if(!page){
                throw ({
                    code: 404,
                    message: "Could find any page related to this " + page_slug,
                    status: "PAGE_NOT_FOUND_ERR"
                })
            }

            res.json({
                data: page,
                message: "Successfully fetched all pages data of " + page.title,
                status: "ok" 
            })
        }catch(exception){
            next(exception)
        }
    }

    async getAllPagesForAdmin(req, res, next) {
        try{
            const {portfolio_slug} = req.params

            // check portfolio is available or not
            const checkPortfolio = await portfolioService.findSingleRowByFilter({
                slug: portfolio_slug,
            })
            if(!checkPortfolio){
                throw{
                    code: 404,
                    message: "Could not find any portfolio with that portfolio slug " + portfolio_slug,
                    status: "PORTFOLIO_NOT_FOUND_ERR"
                }
            }

            const allpages = await pageService.findAllPagesForAdmin(checkPortfolio.id)

            res.json({
                data: allpages,
                message: "Successfully fetched all pages ",
                status: "ok" 
            })
        }catch(exception){
            next(exception)
        }
    }

    async createPage(req, res, next) {
        try{
            const data = await pageService.transformForCreate(req)

            const page = await pageService.create(data)

            // console.log(req.loggedInUser.id)
            res.json({
                data: page,
                message: `Page created successfully`,
                status: "ok"
            })
        }catch(exception){
            next(exception)
        }
    }

    async updatePage(req, res, next){
        try{
            const {portfolio_slug, page_slug} = req.params

            // check portfolio is available or not
            const checkPortfolio = await portfolioService.findSingleRowByFilter({
                slug: portfolio_slug,
                user_id: req.loggedInUser.id
            })
            if(!checkPortfolio){
                throw{
                    code: 404,
                    message: "Could not find any portfolio with that portfolio slug " + portfolio_slug,
                    status: "PORTFOLIO_NOT_FOUND_ERR"
                }
            }

            // check pages is available or not
            const checkPage = await pageService.findSingleRowByFilter({
                slug: page_slug,
                portfolio_id: checkPortfolio.id
            })
            if(!checkPage){
                throw{
                    code: 404,
                    message: "Could not find any pages with that page slug " + page_slug,
                    status: "pages_NOT_FOUND_ERR"
                }
            }

            const data = req.body

            // check page slug already exists or not
            if(data.slug){      
                const checkSlug = await pageService.findSingleRowByFilter({
                    slug: data.slug,
                    portfolio_id: checkPortfolio.id
                })
                if(checkSlug){
                    throw({
                        data: null,
                        message: data.slug + " slug has already used",
                        status: "SLUG_ALREADY_USED_ERR"
                    })
                }

            }

            // update page
            const page = await pageService.updateSingleRowByFilter(data, {
                id: checkPage.id,
            })

            res.json({
                data: page,
                message: "page updated successfully",
                status: 'ok' 
            })
        }catch(exception){
            next(exception)
        }
    }

    async deletePage(req, res, next){
        try{
            const {portfolio_slug, page_slug} = req.params

            // check portfolio is available or not
            const checkPortfolio = await portfolioService.findSingleRowByFilter({
                slug: portfolio_slug,
                user_id: req.loggedInUser.id
            })
            if(!checkPortfolio){
                throw{
                    code: 404,
                    message: "Could not find any portfolio with that portfolio slug " + portfolio_slug,
                    status: "PORTFOLIO_NOT_FOUND_ERR"
                }
            }


            const deleteCount = await pageService.deleteSingleRowByFilter({
                portfolio_id: checkPortfolio.id,
                slug: page_slug
            })

            res.json({
                data: null,
                message: deleteCount + " pages has been deleted successfully",
                status: 'ok'
            })
        }catch(exception){
            next(exception)
        }
    }
}

module.exports = new PageController()