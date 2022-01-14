
exports.isEmptyObject = (object) => {
    return Object.keys(object).length === 0
}


exports.isEmptyText = (str) => {
    return str.trim() === null || str.trim() === "" || str.length === 0
}


exports.isAndroid = (fileName) => {
    return fileName.split(".")[1].toLowerCase() === "apk"
}

exports.isIOS = (fileName) => {
    return fileName.split(".")[1].toLowerCase() === "ipa"
}