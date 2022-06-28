import _ from "lodash"

export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize
    return _(items).slice(startIndex)
        .take(pageSize)  //how many to take 
        .value()// convert ladash object into a regualr arrary
}