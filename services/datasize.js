function convertToDataSize(number) {
    const suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;

    while (number >= 1024 && i < suffixes.length - 1) {
        number /= 1024.0;
        i++;
    }

    // Use toFixed(2) to round to 2 decimal places
    const formattedSize = `${number.toFixed(2)} ${suffixes[i]}`;
    return formattedSize;
}

module.exports = { convertToDataSize };