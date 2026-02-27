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

    async getSection(req, res, next) {
        try{
            const {portfolio_slug, page_slug, section_id} = req.params

            const {checkSection} = await sectionService.checkData(req.loggedInUser?.id, portfolio_slug, page_slug, section_id)

            res.json({
                data: checkSection,
                message: `Successfully fetched all data of ${checkSection.type} section` ,
                status: "ok" 
            })
        }catch(exception){
            next(exception)
        }
    }

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

            // check section type already exists or not
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
            // remove same type in data
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

    async deleteSection(req, res, next){
        const transaction = await sequelize.transaction()
        try{
            const {portfolio_slug, page_slug, section_id} = req.params

            // check portfolio is available or not
            const {checkPage} = await sectionService.checkData(req.loggedInUser.id, portfolio_slug, page_slug, section_id)

            const deleteCount = await sectionService.deleteSingleRowByFilter(
                {
                    page_id: checkPage.id,
                    id: section_id,
                },
                transaction
            )

            await sectionService.reindexPageSections(checkPage.id, transaction)

            await transaction.commit()

            res.json({
                data: null,
                message: deleteCount + " sections has been deleted successfully",
                status: 'ok'
            })
        }catch(exception){
            await transaction.rollback()
            next(exception)
        }
    }
}

module.exports = new sectionController()