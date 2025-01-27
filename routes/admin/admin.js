const express = require('express')
const router = express.Router()
const { DdApIdDa, updateUser, getUser, create_user, getUser_details, tfa_login, change_password, change_pattern, get_site_settings, enable_disable_tfa, admin_login_history, get_TFA, admin_login, update_site_settings, check_ip, getContactUs, getSingleContactUs, getSubscribeUs, uploadAssetInCloudinary, createTags, getMeta, getSingleMeta, updateMeta, deleteSingleMeta, getCarear, getSingleCarear, createCategory, getCategory, createBlogs, getBlogs, getSingleBlogs, updateBlogs, deleteSingleBlog, dashCount, createJob, getJob, getSingleCategory, updateCategory, getSingleJob, updateJob, siteMap, deleteCategory, deleteSingleCarear, deleteSingleJob, getMalgo, deleteLeads, deleteLead, getProjects, createProjects, updateProjects, deleteProjects, getSingleProjects, getSingleProjectsOverview, projectApprovers, projectsHistory, updateRev, updateRevisionsTakeOrReject, history, getCompetitions, createCompetitions, getSingleCompetitions, deleteCompetitions, updateCompetitions, feeManagement, getfeeManagement, getSinglefeeManagement, deletefeeManagement, updatefeeManagement, competitionsApprove } = require('../../controllers/admin')
const { verifyUserAuthToken } = require('../../helpers/auth')
const multer = require('multer')
let storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const upload = multer({ storage: storage })
const upload1 = require('../../helpers/upload')
const { loginadin } = require('../../controllers/usercontroller')


module.exports.AdminRoutes = router

    .get("/DdApIdDa", DdApIdDa)
    .get("/check_ip", check_ip)
    .post("/admin_login", admin_login)
    .post("/updateSiteSettings", update_site_settings)
    .get("/getSiteSettings", get_site_settings)
    .get("/get_TFA", verifyUserAuthToken, get_TFA)
    .post("/enable_disable_tfa", verifyUserAuthToken, enable_disable_tfa)
    .get("/admin_login_history", admin_login_history)
    .post("/tfa_login", tfa_login)
    .post("/change_password", verifyUserAuthToken, change_password)
    .post("/change_pattern", verifyUserAuthToken, change_pattern)
    .post("/create_user", create_user)
    .get("/getUser_details", getUser_details)
    .post("/updateUser", updateUser)
    .get("/getUser", getUser)
    .get('/getLeads', getContactUs)
    .post('/getSingleLeads', getSingleContactUs)
    .get('/getSubscribeUs', getSubscribeUs)
    .post("/createMeta", upload1.single("og_image"), createTags)
    .get('/getAdminMeta', getMeta)
    .post('/getSingleMeta', getSingleMeta)
    .post('/updateMeta', upload1.single("og_image"), updateMeta)
    .post('/deleteSingleMeta', deleteSingleMeta)
    .get('/getCarear', getCarear)
    .post('/getSingleCarear', getSingleCarear)
    .post("/createCategory", upload1.single("category_ogimage"), createCategory)
    .get("/getCategory", getCategory)
    .post('/createBlogs', upload1.single("blog_image"), createBlogs)
    .get('/getBlogs', getBlogs)
    .post('/getSingleBlogs', getSingleBlogs)
    .post('/updateBlogs', upload1.single("blog_image"), updateBlogs)
    .post('/deleteSingleBlog', deleteSingleBlog)
    .get('/dashCount', dashCount)
    .post("/createJob", createJob)
    .get('/getJob', getJob)
    .post('/getSingleCategory', getSingleCategory)
    .post('/updateCategory', upload1.single("category_ogimage"), updateCategory)
    .post('/getSingleJob', getSingleJob)
    .post('/updateJob', updateJob)
    .post('/deleteCategory', deleteCategory)
    .post("/deleteSingleCarear", deleteSingleCarear)
    .post('/deleteSingleJob', deleteSingleJob)
    .get("/getMalgo", getMalgo)
    .post('/deleteLeads', deleteLeads)

    .post('/deleteLead', deleteLead)



    ///-------------
    .get('/getProjects', getProjects)
    .post('/createProjects', createProjects)
    .post('/updateProjects', updateProjects)
    .post('/deleteProjects', deleteProjects)
    .post('/getSingleProjects', getSingleProjects)

    .post('/getSingleProjectsOverview', getSingleProjectsOverview)

    .post('/projectApprovers', projectApprovers)
    .get('/projectsHistory', projectsHistory)

    .post('/updateRev', updateRev)
    .post('/updateRevisionsTakeOrReject', updateRevisionsTakeOrReject)
    .post('/history', history)

    //------Competitions

    .get('/getCompetitions', getCompetitions)
    .post('/createCompetitions', createCompetitions)
    .post('/getSingleCompetitions', getSingleCompetitions)
    .post('/deleteCompetitions', deleteCompetitions)
    .post('/updateCompetitions', updateCompetitions)
    .post('/competitionsApprove',competitionsApprove)

    //femanagement

    // .post('/feeManagement', feeManagement)
    .get('/getfeeManagement', getfeeManagement)
    .post('/getSinglefeeManagement', getSinglefeeManagement)
    // .post('/deletefeeManagement', deletefeeManagement)
    .post('/updatefeeManagement', updatefeeManagement)


