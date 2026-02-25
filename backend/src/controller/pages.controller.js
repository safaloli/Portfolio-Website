const pagesService = require("../services/pages.service")

class PagesController {
    async getpagesBySlug(req, res, next) {
        try{
            const {slug} = req.params

            const pages = await pagesService.findPublicpagesBySlug(slug)

            res.json({
                data: pages,
                message: "Successfully fetched all pages data of " + slug,
                status: "ok" 
            })
        }catch(exception){
            next(exception)
        }
    }

    async getAllpagesForSuperAdmin(req, res, next) {
        try{
            console.log("inside controller")

            const allpages = await pagesService.findAllpagesForSuperAdmin()

            res.json({
                data: allpages,
                message: "Successfully fetched all pages ",
                status: "ok" 
            })
        }catch(exception){
            next(exception)
        }
    }

    async createpages(req, res, next) {
        try{
            const checkpages = await pagesService.findSingleRowByFilter({slug: req.body.slug})

            if(checkpages){
                throw{
                    code: 400,
                    message: req.body.slug + " username already exists",
                    status: "SLUG_ALREADY_EXISTS_ERR"
                }
            }

            const data = await pagesService.transformForCreate(req)

            const pages = await pagesService.create(data)

            // console.log(req.loggedInUser.id)
            res.json({
                data: pages,
                message: `pages created successfully`,
                status: "ok"
            })
        }catch(exception){
            next(exception)
        }
    }

    async updatepages(req, res, next){
        try{
            const pagesId = req.params.pages_id

            const checkpages = await pagesService.findSingleRowByFilter({id: pagesId})

            // check pages is available or not
            if(!checkpages){
                throw{
                    code: 404,
                    message: "Could not find any pages with that pages id",
                    status: "pages_NOT_FOUND_ERR"
                }
            }

            const data = req.body

            // check slug already exists or not
            if(data.slug){
                const checkSlug = await pagesService.findSingleRowByFilter({slug: data.slug})
                
                if(checkSlug){
                    console.log('hi', data.slug, checkpages.slug)
                    throw({
                        data: null,
                        message: data.slug + " slug has already used",
                        status: "SLUG_ALREADY_USED_ERR"
                    })
                }
            }

            // update pages
            const pages = await pagesService.updateSingleRowByFilter(data, {id: pagesId})

            res.json({
                data: pages,
                message: "pages updated successfully",
                status: 'ok' 
            })
        }catch(exception){
            next(exception)
        }
    }

    async deletepages(req, res, next){
        try{
            const pagesId = req.params.pages_id
            const deleteCount = await pagesService.deleteSingleRowByFilter({id: pagesId})

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

module.exports = new PagesController()