//your code here
class OutOfRangeError extends Error {
    constructor(arg) {
        super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
        this.name = 'OutOfRangeError';
    }
}

class InvalidExprError extends Error {
    constructor() {
        super('Expression should not have an invalid combination of expression');
        this.name = 'InvalidExprError';
    }
}
function evalString(expression) {
    try {
        // Remove spaces from the expression
        let expr = expression.replace(/\s+/g, '');

        // Check for invalid characters
        if (/[^0-9+\-*/]/.test(expr)) {
            throw new OutOfRangeError(expression.match(/[^0-9+\-*/]/)[0]);
        }

        // Check for invalid operator combinations
        if (/[+\-*/]{2,}/.test(expr)) {
            throw new InvalidExprError();
        }

        // Check if expression starts with an invalid operator
        if (/^[+\-*/]/.test(expr)) {
            throw new SyntaxError('Expression should not start with invalid operator');
        }

        // Check if expression ends with an invalid operator
        if (/[+\-*/]$/.test(expr)) {
            throw new SyntaxError('Expression should not end with invalid operator');
        }

        // Evaluate the expression (use Function constructor to safely evaluate)
        let result = new Function(`return ${expr}`)();

        // Return the result
        return result;
    } catch (error) {
        // Log the error message and name
        console.error(`${error.name}: ${error.message}`);
    }
}
