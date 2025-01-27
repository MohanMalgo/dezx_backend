const Joi = require('joi');

module.exports = {

    'adminLogin': {
        body: Joi.object({
            admin_email: Joi.string().required().label('Admin Email'),
            admin_password: Joi.string().required().label('Admin Password'),
            admin_pattern: Joi.string().required().label('Admin Pattern'),
            request: Joi.string().required().label('Request'),
            mpin: Joi.string().required().label('Mpin'),

        }),
    },

    'resetPassword': {
        body: Joi.object({
            link: Joi.string().required().label('Link'),
            password: Joi.string().required().label('Password'),
            passwordConfirm: Joi.string().required().label('Confirm Password'),
            request: Joi.string().required().label('request')
        }),
    },
  
    'resetPattern': {
        body: Joi.object({
            link: Joi.string().required().label('Link'),
            pattern: Joi.string().required().label('Pattern'),
            confirmPattern: Joi.string().required().label('Confirm Pattern'),
            request: Joi.string().required().label('request')
        }),
    },

    'forgot': {
        body: Joi.object({
            admin_email: Joi.string().required().label('Admin Email'),
            request: Joi.string().required().label('request')
        })

    },



    'changeEmail': {
        body: Joi.object({
            currentEmail: Joi.string().required().label('Current Email'),
            newEmail: Joi.string().required().label('New Email'),
            mpin: Joi.string().required().label('Admin mpin'),
            request: Joi.string().required().label('request')

        })
    },

    'changePassword': {
        body: Joi.object({
            currentPassword: Joi.string().required().label('Current Password'),
            newPassword: Joi.string().required().label('New Password'),
            confirmNewPassword: Joi.string().required().label('Confirm New Password'),
            mpin: Joi.string().required().label('Admin mpin')

        })
    },

    'changeMpin': {
        body: Joi.object({
            currentMpin: Joi.string().required().label('current Mpin'),
            newMpin: Joi.string().required().label('New Mpin'),
            confirmNewMpin: Joi.string().required().label('Confirm New Mpin'),
        })
    },

    'changePattern': {
        body: Joi.object({
            currentPattern: Joi.string().required().label('Current Pattern'),
            newPattern: Joi.string().required().label('New Pattern'),
            confirmNewPattern: Joi.string().required().label('Confirm New Pattern'),
            mpin: Joi.string().required().label('Admin mpin')


        })
    },

    'siteSettings': {
        body: Joi.object({
            siteName: Joi.string().label('Sitename'),
            copyright: Joi.string().label('Copyrights'),
            instagram: Joi.string().label('Instagram'),
            twitter: Joi.string().label('Twitter'),
            discord: Joi.string().label('Discord'),
            telegram: Joi.string().label('Telegram'),
            facebook: Joi.string().label('facebook'),
            contactNumber: Joi.string().label('contactNumber'),
            contactMail: Joi.string().label('contactMail'),

        }),
    },

    'TFA': {
        body: Joi.object({
            code: Joi.string().required().label('Code'),
            admin_email: Joi.string().required().label('Admin Email'),
            mpin: Joi.string().required().label('Admin mpin')


        })
    },


    'createCurrency': {
        body: Joi.object({
            id: Joi.string().label('Id'),
            currencyName: Joi.string().label('Currency Name'),
            currencySymbol: Joi.string().label('Currency Symbol'),
            currencyImage: Joi.string().label('Currency Image'),
            currencyType: Joi.string().label('Currency Type'),
            currencyDecimal: Joi.string().label('Currency Decimal'),
            currencyNetwork: Joi.string().label('Currency Network'),
            contractAddress: Joi.string().label('Contract Address'),
            apiPath: Joi.string().label('Api Path'),
            usdPrice: Joi.number().label('Usd Price'),
            minAmount: Joi.number().label('Min Amount'),
            maxAmount: Joi.number().label('Max Amount'),
            adminFee: Joi.number().label('Admin Fee'),
            currencyStatus: Joi.boolean().label('Currency Status'),


        }),
    },

    'pagination': {
        body: Joi.object({
            size: Joi.number().label('Size'),
            sortActive: Joi.string().label('Sort Active'),
            page: Joi.number().label('Page'),
        })
    },


    '_id': {
        body: Joi.object({
            id: Joi.string().label('id'),
            fromCurrency: Joi.string().label('From currency'),
            toCurrency: Joi.string().label('To currency'),
            fromNetwork: Joi.string().label('From Network'),
            toNetwork: Joi.string().label('To Network'),
            fromCurrencyPrice: Joi.number().label('From currency price'),
            toCurrencyPrice: Joi.number().label('To currency price'),
            fromMin: Joi.number().label('From Minimum amount'),
            fromMax: Joi.number().label('From Maximum amount'),
            adminFee: Joi.number().label('Admin Fee')
        })
    },
    'blog': {
        body: Joi.object({
            NewImage: Joi.string().allow('').label('NewImage'),
            title: Joi.string().required().label('title'),
            pagecontent: Joi.string().required().label('pagecontent'),
        }),
    },

    'blogs': {
        body: Joi.object({
            newsbanner: Joi.string().allow('').label('Image'),
            newstitle: Joi.string().required().label('title'),
            newspagecontent: Joi.string().required().label('pagecontent'),
            id: Joi.string().required().label('id'),
        }),
    },
    'adminid': {
        body: Joi.object({
            admin_id: Joi.string().required().label('id'),
        }),
    },
    'cms': {
        body: Joi.object({
            id: Joi.string().label('Id'),
            pagekey: Joi.string().label('Pagekey'),
            title: Joi.string().label('Title'),
            pagecontent: Joi.string().label('Page Content')
        })
    },

    'update_faq': {
        body: Joi.object({
            id: Joi.string().label('id'),
            pageTitle: Joi.string().label('pageTitle'),
            question: Joi.string().label('question'),
            answer: Joi.string().label('answer')
        })
    },
    'adminFee': {
        body: Joi.object({
            currencySymbol: Joi.string().label('currencySymbol'),
            TokenSymbol: Joi.string().label('TokenSymbol'),
            adminFee: Joi.number().label('Admin Fee')

        })
    },
    'email_template': {
        body: Joi.object({
            id: Joi.string().label('id'),
            title: Joi.string().label('title'),
            template: Joi.string().label('template')
        })
    },



    'addsub': {
        body: Joi.object({
            admin_email: Joi.string().required().label('AdminEmail'),
            admin_pattern: Joi.string().required().label('AdminPattern'),
            admin_username: Joi.string().required().label('AdminUsername'),
            access: Joi.array().label('Access'),

        }),
    },

    'updatebusinessvault': {
        body: Joi.object({
            _id: Joi.string().required().label('_id'),
            phase: Joi.string().required().label('phase'),
            totalAllocation: Joi.number().required().label('totalAllocation'),
            minBuy: Joi.number().required().label('minBuy'),
            maxBuy: Joi.number().required().min(Joi.ref('minBuy')).label('maxBuy'),
            allocation: Joi.number().required().label('allocation'),
            allocatedDays: Joi.string().required().label('allocatedDays'),
            ANAPrice: Joi.number().required().label('ANAPrice'),
        }),
    },

    'updatesub': {
        body: Joi.object({
            admin_status: Joi.string().allow('').label('AdminStatus'),
            permissions: Joi.string().allow('').label('AdminAccess'),
            _id: Joi.string().required().label('AdminID'),

        }),
    },

    'updatesub': {
        body: Joi.object({
            admin_status: Joi.string().allow('').label('AdminStatus'),
            permissions: Joi.string().allow('').label('AdminAccess'),
            _id: Joi.string().required().label('AdminID'),

        }),
    },



    'getPendingWithdraw': {
        body: Joi.object({
            limit: Joi.number().required().label('limit'),
            page: Joi.number().required().label('page'),
            filter: Joi.string().allow('').label('filter'),
        }),
    },


    'getWithdraw': {
        body: Joi.object({
            limit: Joi.allow().label('limit'),
            page: Joi.number().allow().label('page'),
            filter: Joi.string().allow('').label('filter'),
            status: Joi.boolean().required().label('exportStatus'),
            type: Joi.string().required().label('type'),
        }),
    },

    'getSingleWithdraw': {
        query: Joi.object({
            id: Joi.string().required().label('id'),
        }),
    },


    'approveWithdraw': {
        body: Joi.object({
            MPIN: Joi.string().required().label('MPIN'),
            id: Joi.string().required().label('id'),
            randomdata: Joi.number().label('randomdata')
        }),
    },
    'updateFee': {
        body: Joi.object({
            id: Joi.string().required().label('id'),
            currencyName: Joi.string().label('Currency Name'),
            maximumWithdraw: Joi.number().label('maximumWithdraw'),
            minimumDeposit: Joi.number().label('minimumDeposit'),
            minimumWithdraw: Joi.number().label('minimumWithdraw'),
            status: Joi.boolean().label('status'),

        }),
    },


};
