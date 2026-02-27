const {sectionValidationMap, sectionDefaultContent} = require('../config/section.config')
const { sequelize } = require('../config/sequelize.config')

const {SectionModel, PortfolioModel, PageModel } = require("../models")
const {UniqueConstraintError, Op} = require('sequelize')

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
            data.order = maxOrder !== null? maxOrder + 1 : 1

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

    async updateSingleRowByFilter(data, filter, transaction = null) {
        try{
            let sections = await SectionModel.update(data, {
                where: filter,
                returning: true,
                transaction
            })
            return sections[1]
        }catch(exception){
            throw exception
        }
    }

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

    async findAllByFilter(filter){
        try{
            const result = await SectionModel.findAll({where: filter})
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

    async deleteSingleRowByFilter(filter, transaction = null){
        try{
            const deleteCount = await SectionModel.destroy(
                {where: filter}, 
                transaction
            )

            if(deleteCount === 0){
                throw({
                    code: 404,
                    message: "section not found while deleting",
                    status: "section_NOT_FOUND_ERR"
                })
            }
            return deleteCount
        }catch(exception){  
            throw exception
        }
    }

    async checkData(user_id, portfolio_slug = null, page_slug = null, section_id = null) {
        try{
            let checkPortfolio, checkPage, checkSection = null

            // check portfolio exits or not
            if(portfolio_slug !== null){
                let portfolioFilter = null;
                if(!user_id){
                    portfolioFilter = {slug: portfolio_slug}
                }else{
                    portfolioFilter = {slug: portfolio_slug, user_id: user_id}
                }
                checkPortfolio = await PortfolioModel.findOne({
                    where: portfolioFilter
                })
                if(!checkPortfolio){
                    throw ({
                        code: 404,
                        message: "Could not find any portfolio",
                        status: "PORTFOLIO_NOT_FOUND_ERR"
                    })
                }
            }

            // check page exits or not
            if(page_slug !== null){
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

            // check section exits or not
            if(section_id !== null){
                
                checkSection = await SectionModel.findOne({
                    where: {
                        id: section_id,
                    }
                })
                if(!checkSection){
                    throw ({
                        code: 404,
                        message: "Could not find any section",
                        status: "SECTION_NOT_FOUND_ERR"
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

            console.log('im inside validation')
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

    async reorder(page_id, section_id, newOrder, transaction) {
        try{
            if(newOrder <= 0 || !Number.isInteger(newOrder)){
                throw{
                    code: 400,
                    message: "Invalid order number",
                    status: "INVALID_ORDER_NUMBER_ERR"
                }
            }

            const section = await SectionModel.findOne({
                where: { id: section_id, page_id: page_id },
                transaction
            });
    
            if (!section) {
                throw {
                    code: 404,
                    message: "Section not found",
                    status: "SECTION_NOT_FOUND_ERR"
                };
            }
    
            const oldOrder = section.order;
    
            if (oldOrder === newOrder) {
                return;
            }
    
            // Moving DOWN
            if (newOrder > oldOrder) {
                await SectionModel.update(
                    { order: sequelize.literal('"order" - 1') },
                    {
                        where: {
                            page_id,
                            order: { [Op.gt]: oldOrder, [Op.lte]: newOrder }
                        },
                        transaction
                    }
                );
            }
    
            // Moving UP
            if (newOrder < oldOrder) {
                await SectionModel.update(
                    { order: sequelize.literal('"order" + 1') },
                    {
                        where: {
                            page_id,
                            order: { [Op.gte]: newOrder, [Op.lt]: oldOrder }
                        },
                        transaction
                    }
                );
            }
    
            // Finally update dragged section
            section.order = newOrder;
            await section.save({ transaction });
    
        }catch(exception){
            throw exception
        }
    }

    async reindexPageSections(page_id, transaction) {
        try{
            const sections = await SectionModel.findAll({
                where: { page_id },
                order: [['order', 'ASC']],
                transaction
            });
    
            for(let i = 0; i < sections.length; i++) {
                await sections[i].update(
                    {order: i+1},
                    transaction
                )
            }
        }catch(exception){
            throw exception
        }
    }

    
    
}

module.exports = new sectionService()