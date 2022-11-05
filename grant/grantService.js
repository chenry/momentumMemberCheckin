var grantsRepository = require('./grantRepository');

exports.findGrantById = async function(grantId) {
    return await grantsRepository.findGrantById(grantId);
};

