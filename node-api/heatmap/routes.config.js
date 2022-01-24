const heatmapController = require('./controllers/heatmap.controller');

exports.routesConfig = function (app) {
    app.get('/heatmap', [
        heatmapController.getData
    ]);

    app.get('/heatmap/candidates', [
        heatmapController.getEligible
    ]);

    app.get('/heatmap/gen/:quantity', [
        heatmapController.generateData
    ]);
};