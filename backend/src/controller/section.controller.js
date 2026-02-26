const sectionService = require("../services/section.service")

class sectionController {
    async createSection(req, res, next) {
        try{
            const data = await sectionService.transformForCreate(req)

            const section = await sectionService.create(data)

            // console.log(req.loggedInUser.id)
            res.json({
                data: section,
                message: `section created successfully`,
                status: "ok"
            })
        }catch(exception){
            next(exception)
        }
    }

    // async getsectionBySlug(req, res, next) {
    //     try{
    //         const {section_slug, portfolio_slug} = req.params

    //         if(!portfolio_slug) {
    //             throw({
    //                 code: 500,
    //                 message: "Portfolio slug is empty",
    //                 status: "PORTFOLIO_SLUG_EMPTY_ERR"
    //             })
    //         }
            
    //         if(!section_slug) {
    //             throw({
    //                 code: 500,
    //                 message: "Portfolio > section slug is empty",
    //                 status: "section_SLUG_EMPTY_ERR"
    //             })
    //         }
    //         const portfolio = await portfolioService.findSingleRowByFilter({slug: portfolio_slug})

    //         if(!portfolio){
    //             throw ({code: 404, message: "Portfolio could not found", status: "PORTFOLIO_NOT_FOUND_ERR"})
    //         }

    //         const section = await sectionService.findPublicsectionBySlug(section_slug)

    //         if(!section){
    //             throw ({
    //                 code: 404,
    //                 message: "Could find any section related to this " + section_slug,
    //                 status: "section_NOT_FOUND_ERR"
    //             })
    //         }

    //         res.json({
    //             data: section,
    //             message: "Successfully fetched all sections data of " + section.title,
    //             status: "ok" 
    //         })
    //     }catch(exception){
    //         next(exception)
    //     }
    // }

    // async getAllsectionsForAdmin(req, res, next) {
    //     try{
    //         const {portfolio_slug} = req.params

    //         // check portfolio is available or not
    //         const checkPortfolio = await portfolioService.findSingleRowByFilter({
    //             slug: portfolio_slug,
    //         })
    //         if(!checkPortfolio){
    //             throw{
    //                 code: 404,
    //                 message: "Could not find any portfolio with that portfolio slug " + portfolio_slug,
    //                 status: "PORTFOLIO_NOT_FOUND_ERR"
    //             }
    //         }

    //         const allsections = await sectionService.findAllsectionsForAdmin(checkPortfolio.id)

    //         res.json({
    //             data: allsections,
    //             message: "Successfully fetched all sections ",
    //             status: "ok" 
    //         })
    //     }catch(exception){
    //         next(exception)
    //     }
    // }


    // async updatesection(req, res, next){
    //     try{
    //         const {portfolio_slug, section_slug} = req.params

    //         // check portfolio is available or not
    //         const checkPortfolio = await portfolioService.findSingleRowByFilter({
    //             slug: portfolio_slug,
    //             user_id: req.loggedInUser.id
    //         })
    //         if(!checkPortfolio){
    //             throw{
    //                 code: 404,
    //                 message: "Could not find any portfolio with that portfolio slug " + portfolio_slug,
    //                 status: "PORTFOLIO_NOT_FOUND_ERR"
    //             }
    //         }

    //         // check sections is available or not
    //         const checksection = await sectionService.findSingleRowByFilter({
    //             slug: section_slug,
    //             portfolio_id: checkPortfolio.id
    //         })
    //         if(!checksection){
    //             throw{
    //                 code: 404,
    //                 message: "Could not find any sections with that section slug " + section_slug,
    //                 status: "sections_NOT_FOUND_ERR"
    //             }
    //         }

    //         const data = req.body

    //         // check section slug already exists or not
    //         if(data.slug){      
    //             const checkSlug = await sectionService.findSingleRowByFilter({
    //                 slug: data.slug,
    //                 portfolio_id: checkPortfolio.id
    //             })
    //             if(checkSlug){
    //                 throw({
    //                     data: null,
    //                     message: data.slug + " slug has already used",
    //                     status: "SLUG_ALREADY_USED_ERR"
    //                 })
    //             }

    //         }

    //         // update section
    //         const section = await sectionService.updateSingleRowByFilter(data, {
    //             id: checksection.id,
    //         })

    //         res.json({
    //             data: section,
    //             message: "section updated successfully",
    //             status: 'ok' 
    //         })
    //     }catch(exception){
    //         next(exception)
    //     }
    // }

    // async deletesection(req, res, next){
    //     try{
    //         const {portfolio_slug, section_slug} = req.params

    //         // check portfolio is available or not
    //         const checkPortfolio = await portfolioService.findSingleRowByFilter({
    //             slug: portfolio_slug,
    //             user_id: req.loggedInUser.id
    //         })
    //         if(!checkPortfolio){
    //             throw{
    //                 code: 404,
    //                 message: "Could not find any portfolio with that portfolio slug " + portfolio_slug,
    //                 status: "PORTFOLIO_NOT_FOUND_ERR"
    //             }
    //         }


    //         const deleteCount = await sectionService.deleteSingleRowByFilter({
    //             portfolio_id: checkPortfolio.id,
    //             slug: section_slug
    //         })

    //         res.json({
    //             data: null,
    //             message: deleteCount + " sections has been deleted successfully",
    //             status: 'ok'
    //         })
    //     }catch(exception){
    //         next(exception)
    //     }
    // }
}

module.exports = new sectionController()