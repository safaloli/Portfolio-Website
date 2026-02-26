const {sectionValidationMap, sectionDefaultContent} = require('../config/section.config')
const { sequelize } = require('../config/sequelize.config')

const {SectionModel, PortfolioModel, PageModel } = require("../models")
const {UniqueConstraintError} = require('sequelize')

class sectionService {
    async transformForCreate(req){
        try{
            const data = req.body
            const {portfolio_slug, page_slug} = req.params

            // validate slug
            if(!portfolio_slug || !page_slug){
                throw({code: 403, message: "Portfolio or Page slug is missing", status: "SLUG_MISSING_ERR"})
            }

            // validate payload is not empty
            if(!data || Object.keys(data).length === 0){
                throw({code: 400, message: "Payload is empty", status: "EMPTY_PAYLOAD_ERR"})
            }


            // verify portfolio + page ownership
            const {checkPage} = await this.checkData(req.loggedInUser.id, portfolio_slug, page_slug)

            // attach pageid
            data.page_id = checkPage.id  

            // validate section content
            data.content = await this.validateSectionContent(data.type, data.content)
            if(!data.content){
                data.content = sectionDefaultContent[data.type]
            }
            
            // adding index of sections
            const maxOrder = await SectionModel.max('order', {
                where: { page_id: data.page_id }
            })
            data.order = maxOrder !== null? maxOrder + 1 : 0

            return data

        }catch(exception){
            throw exception
        }
    }

    async create(data) {
        try{
            return await SectionModel.create(data)
        }catch(exception){
            if(exception instanceof UniqueConstraintError){
                throw{
                    code: 400,
                    message: data.type + " section already exists",
                    status: "SECTION_ALREADY_EXISTS_ERR"
                }
            }
            throw exception
        }
    }

    // async updateSingleRowByFilter(data, filter) {
    //     try{
    //         let sections = await sectionModel.update(data, {
    //             where: filter,
    //             returning: true
    //         })
    //         return sections[1]
    //     }catch(exception){
    //         throw exception
    //     }
    // }

    // async findAllsectionsForAdmin(portfolio_id) {
    //     try{
    //         const allsections = await sectionModel.findAll({
    //             where: {portfolio_id: portfolio_id},
    //             model: sectionModel,
    //             as: 'sections',
    //             include: [
    //                 {
    //                     model: SectionModel,
    //                     where: {is_active: true},
    //                     required: false,
    //                     as: 'sections'
    //                 }
    //             ]
    //         })

    //         if(!allsections){
    //             throw ({code: 404, message: "There is no any sections in database"})
    //         }

    //         return allsections
    //     }catch(exception){
    //         throw exception
    //     }
    // }

    async findSingleRowByFilter(filter){
        try{
            const result = await SectionModel.findOne({where: filter})
            return result
        }catch(exception){
            throw exception
        }
    }

    // async findPublicsectionBySlug(slug) {
    //     try{
    //         const section = await sectionModel.findOne({
    //             where: {slug, is_active: true},
    //             include: [
    //                 {
    //                     model: SectionModel,
    //                     where: {is_active: true},
    //                     required: false,
    //                     as: 'sections'
    //                 }
    //             ]
    //         })

    //         return section
    //     }catch(exception){
    //         throw exception
    //     }
    // }

    // async deleteSingleRowByFilter(filter){
    //     try{
    //         const deleteCount = await sectionModel.destroy({where: filter})

    //         if(deleteCount === 0){
    //             throw({
    //                 code: 404,
    //                 message: "section not found while deleting",
    //                 status: "section_NOT_FOUND_ERR"
    //             })
    //         }
    //         return deleteCount
    //     }catch(exception){  
    //         throw exception
    //     }
    // }

    async checkData(user_id, portfolio_slug = null, page_slug = null, section_id = null) {
        try{
            let checkPortfolio, checkPage, checkSection = null

            if(portfolio_slug !== null){
                // check portfolio exits or not
                checkPortfolio = await PortfolioModel.findOne({
                    where: {
                        slug: portfolio_slug,
                        user_id: user_id
                    }
                })
                if(!checkPortfolio){
                    throw ({
                        code: 404,
                        message: "Could not find any portfolio",
                        status: "PORTFOLIO_NOT_FOUND_ERR"
                    })
                }
            }

            if(page_slug !== null){
                // check page exits or not
                checkPage = await PageModel.findOne({
                    where: {
                        slug: page_slug,
                        portfolio_id: checkPortfolio.id
                    }
                })
                if(!checkPage){
                    throw ({
                        code: 404,
                        message: "Could not find any page",
                        status: "PAGE_NOT_FOUND_ERR"
                    })
                }
            }

            if(section_id !== null){
                // check section exits or not
                checkPage = await SectionModel.findOne({
                    where: {
                        id: section_id,
                        page_id: checkPage.id
                    }
                })
                if(!checkPage){
                    throw ({
                        code: 404,
                        message: "Could not find any page",
                        status: "PAGE_NOT_FOUND_ERR"
                    })
                }
            }

            return {checkPortfolio, checkPage, checkSection}
        }catch(exception){
            throw(exception)
        }
    }

    async validateSectionContent(type, content){
        try{
            const schema = sectionValidationMap[type]

            if(!schema){
                throw{
                    code: 400,
                    message: "Invalid section type: " + type,
                    status: "INVALID_SECTION_TYPE_ERR"
                }
            }

            const value = await schema.validateAsync(content)

            return value
        }catch(exception){
            if(exception.isJoi){
                throw{
                    code: 400,
                    message: exception.details[0].message,
                    status: "SECTION_VALIDATION_ERR"
                }
            }
            throw exception
        }
    }

    
    
}

module.exports = new sectionService()