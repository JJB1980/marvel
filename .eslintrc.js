module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
        "mocha": true
    },
    "extends": "standard",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "chai-expect"
    ],
    "globals": {
        "expect": true
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "warn",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "object-curly-spacing": ["error", "never"],
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars":
        "error"
    }
};