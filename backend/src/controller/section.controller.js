const { sequelize } = require("../config/sequelize.config")
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

    async reorderSections(req, res, next){
        try{
            const {portfolio_slug, page_slug, section_id} = req.params
            let new_order = req.body.new_order
            new_order = Number(new_order)

            const {checkPage} = await sectionService.checkData(req.loggedInUser.id, portfolio_slug, page_slug, section_id)

            await sectionService.reorder(checkPage.id, section_id, new_order)

            res.json({
                data: null,
                message: "Sections are reordered successfully",
                status: 'ok'
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


    async updateSection(req, res, next){
        const transaction = await sequelize.transaction()
        try{
            const {portfolio_slug, page_slug, section_id} = req.params

            const {checkPage, checkSection} = await sectionService.checkData(req.loggedInUser.id, portfolio_slug, page_slug, section_id)

            const data = req.body

            // check section slug already exists or not
            if(data.type){
                const checkType = await sectionService.findSingleRowByFilter({
                    type: data.type,
                    page_id: checkPage.id,
                })
                if(checkType && data.type !== checkType.type){
                    throw({
                        data: null,
                        message: data.type + " section has already useddd",
                        status: "SECTION_ALREADY_USED_ERR"
                    })
                }
            }

            if(data.type === checkSection.type){
                delete data.type
            }
            
            // content validation
            if(data.type || data.content){
                data.content = await sectionService.validateSectionContent(
                    data.type || checkSection.type, 
                    data.content
                )   
            }

            if(data.order !== undefined && data.order === checkSection.order){
                delete data.order
            }
            // section reorder 
            if(data.order !== undefined){
                data.order = Number(data.order)
                await sectionService.reorder(
                    checkPage.id,
                    section_id,
                    data.order,
                    transaction
                )
            }

            // update section
            const section = await sectionService.updateSingleRowByFilter(
                data, 
                {id: section_id},
                transaction
            )

            await transaction.commit()

            res.json({
                data: section,
                message: "section updated successfully",
                status: 'ok' 
            })
        }catch(exception){
            await transaction.rollback()
            next(exception)
        }
    }

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