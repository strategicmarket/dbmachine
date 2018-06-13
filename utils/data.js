
//////////////////////////////////////////////////////
////////         Generate test data           ///////
////////////////////////////////////////////////////


const _     = require('lodash')
const faker = require('faker')
const {
    timeDays,
    timeFormat,
    randomUniform,
} = require('d3')

const programmingLanguages = [
    'php', 'make', 'javascript', 'go', 'erlang', 'elixir', 'lisp', 'haskell', 'python', 'ruby', 'hack', 'scala', 'java', 'rust', 'c', 'css', 'sass', 'stylus'
]

exports.generateProgrammingLanguageStats = (shuffle = true, limit = -1) => {
    let langs = programmingLanguages
    if (shuffle) {
        langs = _.shuffle(langs)
    }
    if (limit < 1) {
        limit = 1 + Math.round(Math.random() * (programmingLanguages.length - 1))
    }

    const stats = langs.map((language, i) => ({ label: language }))
        .slice(0, limit).map(language => {
            language.value = Math.round(Math.random() * 600)

            return language
        })

    return stats
}

exports.uniqRand = generator => {
    const used = []

    return (...args) => {
        let value
        do {
            value = generator(...args)
        } while (used.includes(value))

        used.push(value)

        return value
    }
}

exports.generateDrinkStats = (size = 16) => {
    const rand    = () => Math.round(randomUniform(60)())
    const types   = ['whisky', 'rhum', 'gin', 'vodka', 'cognac']
    const country = exports.uniqRand(faker.address.countryCode)

    return _.range(size).map(() => {
        const row = { country: country() }
        types.forEach(type => {
            row[type] = rand()
        })

        return row
    })
}

exports.generateSerie = (length = 20) => {
    const data = []
    const max  = 100 + Math.random() * (Math.random() * 600)

    for (let i = 0; i < length; i++) {
        data.push(Math.round(Math.random() * max))
    }

    return data
}

exports.generateStackData = (size = 3) => {
    const length = 16
    return _.range(size).map(() => exports.generateSerie(length).map((v, i) => ({ x: i, y: v })))
}


exports.generateCitiesPopulation = size => {
    const city = exports.uniqRand(faker.address.city)

    return _.range(size).map(() => ({
        city:       city(),
        population: 200 + Math.round(Math.random() * Math.random() * 1000000)
    }))
}


exports.generateDayCounts = (from, to, maxSize = .9) => {
    const days = timeDays(from, to)

    const size = Math.round(days.length * (maxSize * .4)) + Math.round(Math.random() * (days.length * (maxSize * .6)))

    const dayFormat = timeFormat('%Y-%m-%d')

    return _.shuffle(days).slice(0, size).map(day => {
        return {
            day:   dayFormat(day),
            value: Math.round(Math.random() * 400),
        }
    })
}


const libTreeItems = [
    ['viz', [
        ['stack', [
            ['chart'],
            ['xAxis'],
            ['yAxis'],
            ['layers']
        ]],
        ['pie', [
            ['chart', [
                ['pie', [
                    ['outline'],
                    ['slices'],
                    ['bbox']
                ]],
                ['donut'],
                ['gauge']
            ]],
            ['legends']
        ]]
    ]],
    ['colors', [
        ['rgb'],
        ['hsl']
    ]],
    ['utils', [
        ['randomize'],
        ['resetClock'],
        ['noop'],
        ['tick'],
        ['forceGC'],
        ['stackTrace'],
        ['dbg']
    ]],
    ['generators', [
        ['address'],
        ['city'],
        ['animal'],
        ['movie'],
        ['user']
    ]],
    ['set', [
        ['clone'],
        ['intersect'],
        ['merge'],
        ['reverse'],
        ['toArray'],
        ['toObject'],
        ['fromCSV'],
        ['slice'],
        ['append'],
        ['prepend'],
        ['shuffle'],
        ['pick'],
        ['plouc']
    ]],
    ['text', [
        ['trim'],
        ['slugify'],
        ['snakeCase'],
        ['camelCase'],
        ['repeat'],
        ['padLeft'],
        ['padRight'],
        ['sanitize'],
        ['ploucify']
    ]],
    ['misc', [
        ['whatever', [
            ['hey'],
            ['WTF'],
            ['lol'],
            ['IMHO']
        ]],
        ['other'],
        ['stuff', [
            ['stuffA'],
            ['stuffB', [
                ['stuffB1'],
                ['stuffB2'],
                ['stuffB3'],
                ['stuffB4']
            ]],
            ['stuffC', [
                ['stuffC1'],
                ['stuffC2'],
                ['stuffC3'],
                ['stuffC4'],
                ['stuffC5'],
                ['stuffC6'],
                ['stuffC7'],
                ['stuffC8'],
                ['stuffC9']
            ]]
        ]]
    ]]
]

exports.generateLibTree = (
    name = 'nivo',
    limit,
    children = libTreeItems
) => {
    limit = limit || children.length
    if (limit > children.length) {
        limit = children.length
    }

    const tree = { name }
    if (children && children.length > 0) {
        tree.children = _.range(limit).map((o, i) => {
            const leaf = children[i]

            // full path `${name}.${leaf[0]}`
            return exports.generateLibTree(leaf[0], null, leaf[1] || [])
        })
    } else {
        tree.loc = Math.round(Math.random() * 200000)
    }

    return tree
}
