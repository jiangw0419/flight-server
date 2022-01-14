/**
 * 基础数据格式
 * @param {错误编号 0成功，其他失败}  error_no 
 * @param {错误信息} error_info 
 * @param {数据} data 
 * @returns 
 */
let baseData = (error_no, error_info, data) => {
    return {
        error_no: error_no,
        error_info: error_info,
        data: data
    }
}

/**
 * 
 * @param {flag = 1成功，其他失败} flag 
 * @param {信息} data
 * @returns 
 */
let flagData = (flag, data) => {
    return {
        flag: flag,
        info: data
    }
}

exports.success = (data) => {
    return baseData("0", "", data)
}

exports.baseError = (error_no, error_info) => {
    return baseData(error_no, error_info, "")
}

exports.error = (error_info) => {
    return baseData("-1", error_info, "")
}

exports.successFlag = (data) => {
    return this.responseFlag(1, data)
}

exports.errorFlag = (data) => {
    return this.responseFlag(-1, data)
}

exports.responseFlag = (flag, data) => {
    return this.success(flagData(1, data))
}

