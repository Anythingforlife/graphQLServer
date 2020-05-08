module.exports = (req, error) => {
    req.res.statusCode = req.res.manualStatusCode ? req.res.manualStatusCode : 500;
    throw new Error(error);
};
