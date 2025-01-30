const express = require('express');
const router = express.Router();
const { create_user, contactUs, SubscribeUs, imgup, carear, getUserMeta, getBlogs, getPage, getAllBlogs, getBlogsCategory, getCategoryDetails, getJob, siteMap, sitemapcategory, malgopreDATA, testLeads, loginadin, signUp, getProjects, getSingleProject, oAuth, signin, productsFormUpdate, getUser, logout, getProjectsByEmail, createProjectByUser, withdrawDPcoin, getCompetitions, abcd, getSingleCompetitions, createCompetitions, addApplicantToCompetition, withdraw, purchaseCourses, purchaseCourseuser, confirmPurchase, verifyOTP, regenerateOTP, getUserOTP, getCompetitionsByEmail, userCompetitions, getRefList } = require('../../controllers/usercontroller');


const multer = require('multer');
const { contactUsLimiter } = require('../../helpers/common');
const { deleteSingleCarear } = require('../../controllers/admin');
const { verifyUserAuthToken } = require('../../helpers/auth');
let storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    }
});

const upload = multer({ storage: storage })
module.exports.userRoutes = router
    .post("/create_user", create_user)
    .post('/createLeads', contactUsLimiter, contactUs)
    .post('/SubscribeUs', SubscribeUs)
    .post('/carear', upload.single("image"), carear) // Ensure this matches
    .get('/getUserMeta', getUserMeta)
    .post('/getBlogs', getBlogs)
    .post('/getPage', getPage)
    .get('/getAllBlogs', getAllBlogs)
    .post('/getBlogsCategory', getBlogsCategory)
    .post('/getCategoryDetails', getCategoryDetails)
    .get('/getJob', getJob)
    .get('/siteMap', siteMap)
    .get('/sitemapcategory', sitemapcategory)
    .post('/malgopreDATA', malgopreDATA)

    //user side

    //auth
    .post("/signup", signUp)
    .post('/verifyOTP', verifyOTP)
    .post('/regenerateOTP', regenerateOTP)
    .post('/getUserOTP', getUserOTP)
    .post('/oAuth', oAuth)
    .post('/signin', signin)
    .post('/logout', verifyUserAuthToken, logout)
    //projects
    .get('/getUser', verifyUserAuthToken, getUser)
    .get("/getProjects", getProjects)
    .post("/getSingleProject", getSingleProject)
    .post("/productsFormUpdate", verifyUserAuthToken, productsFormUpdate)

    .get('/getProjectsByEmail', verifyUserAuthToken, getProjectsByEmail)

    .post('/createProjectByUser', verifyUserAuthToken, createProjectByUser)

    // withdraw

    .post('/withdrawDPcoin', verifyUserAuthToken, withdrawDPcoin)
    .post('/purchaseCourseuser', verifyUserAuthToken, purchaseCourseuser)
    .post('/confirmPurchase', verifyUserAuthToken, confirmPurchase)

    //getCompetitions
    .post('/getCompetitions', getCompetitions)
    .post('/getSingleCompetitions', getSingleCompetitions)
    .post('/addApplicantToCompetition', verifyUserAuthToken, addApplicantToCompetition)

    .post('/withdraw', verifyUserAuthToken, withdraw)
    .post('/getCompetitionsByEmail', verifyUserAuthToken, getCompetitionsByEmail)

    .post('/userCompetitions', verifyUserAuthToken, userCompetitions)

    .get('/getRefList', verifyUserAuthToken, getRefList)





    .post('/abcd', abcd)