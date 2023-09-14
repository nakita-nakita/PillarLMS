const singleton = {}

type setArgs = {
    location: string
    key: string
    value: any
}

const set = function(args: setArgs) {
    singleton[args.location] = singleton[args.location] || {}
    singleton[args.location][args.key] = singleton[args.location][args.key] || {}
    singleton[args.location][args.key] = args.value

    return singleton[args.location][args.key]
}

type getArgs = {
    location: string,
    key: string
}

const get = function(args: getArgs) {
    return singleton[args.location] ? singleton[args.location][args.key] : null
}

type removeArgs = {
    location: string
    key: string
}

const remove = function(args: removeArgs) {
    if (singleton[args.location]) {
        delete singleton[args.location][args.key]
        return true
    }

    return false
}

type destoryArgs = {
    location: string
}

const destory = function(args: destoryArgs) {
    if (singleton[args.location]) {
        delete singleton[args.location]

        return true
    }

    return false
}

export interface cacheType {
    
}

const singletonCachingService = {
    get,
    set,
    remove,
    destory
}

export default singletonCachingService
