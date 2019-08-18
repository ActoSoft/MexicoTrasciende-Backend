module.exports = {
    'env': {
        'commonjs': true,
        'es6': true,
        'node': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaVersion': 2018
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'comma-spacing': [
            'error',
            {
                'before': false,
                'after': true
            }
        ],
        'space-infix-ops': 'error',
        'no-mixed-spaces-and-tabs': 0,
        'no-cond-assign': [
            'error',
            'always'
        ],
        'no-dupe-args': 'error',
        'no-dupe-keys': 'error',
        'no-empty': [
            'error',
            {
                'allowEmptyCatch': true
            }
        ],
        'no-extra-parens': 'error',
        'no-irregular-whitespace': 'error',
        'no-template-curly-in-string': 'error',
        'object-curly-spacing': [2, 'always']
    }
}