var express = require('express');
var router = express.Router();
var OpportunityHandler = require('../handlers/opportunity');
var authStackMiddleware = require('../helpers/checkAuth');
var MODULES = require('../constants/modules');

module.exports = function (models, event) {
    'use strict';

    var handler = new OpportunityHandler(models, event);
    var moduleId = MODULES.OPPORTUNITIES;
    var accessStackMiddleware = require('../helpers/access')(moduleId, models);

    router.get('/', authStackMiddleware, accessStackMiddleware, handler.getByViewType);
    router.get('/totalCollectionLength', authStackMiddleware, accessStackMiddleware, handler.totalCollectionLength);
    router.get('/getFilterValues', authStackMiddleware, accessStackMiddleware, handler.getFilterValues);
    router.get('/OpportunitiesForMiniView', authStackMiddleware, accessStackMiddleware, handler.opportunitiesForMiniView);
    router.get('/getLengthByWorkflows', authStackMiddleware, accessStackMiddleware, handler.getLengthByWorkflows);
    router.get('/priority', authStackMiddleware, accessStackMiddleware, handler.getLeadsPriority);
    router.post('/', authStackMiddleware, accessStackMiddleware, handler.create);
    router.post('/createLeadFromSite', handler.addNewLeadFromSite);
    router.patch('/:id', authStackMiddleware, accessStackMiddleware, handler.updateOnlySelectedFields);
    router.put('/:id', authStackMiddleware, accessStackMiddleware, handler.update);
    router.delete('/:id', authStackMiddleware, accessStackMiddleware, handler.remove);

    return router;
};
