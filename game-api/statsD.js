module.exports = (context) => {
    const statsD = contex('hotshots');
    return new statsD({
        host: 'my_datadog_container'
    });
};