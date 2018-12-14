module.exports = (context) => {
    const statsD = context('hotshots');
    return new statsD({
        host: 'my_datadog_container'
    });
};