$(function() {
    
    // Declare all initiliation variables
    var keys         = $('button'),
        operators    = ['/', '*', '-', '+', '%'],
        lastOperator = '',
        decimalAdded = false;
    
    // Loop all key
    keys.each(function(i, el) {

        $(this).click(function(event) {

            // Add initial variables
            var keyValue    = $(this).html(),
                detail      = $('#detail'),
                detailValue = detail.html(),
                lastChar    = detailValue[detailValue.length - 1],
                result      = $('#result-value');

            // Use switch case for different function of keys
            switch (keyValue) {
                // Case for clearing the calculator
                case 'C':
                    result.html('0');
                    detail.html('');
                    break;
                // Show the result for calculation
                case '=':
                    if (detail.html() != '') {
                        result.html(eval(detailValue));
                        decimalAdded = false;
                    }
                    break;
                // Case for arithmatic operator
                case '/':
                case '*':
                case '-':
                case '+':
                case '%':
                    if (detailValue != '' && $.inArray(lastChar, operators) == -1) {
                        detail.html(detailValue + keyValue)
                    } else {
                        detail.html(detailValue.replace(/.$/, keyValue));
                    }

                    decimalAdded = false;
                    lastOperator = keyValue;
                    break;
                // Case for delete char
                case 'del':
                    if (lastChar == '.') {
                        decimalAdded = false;   
                    }

                    detail.html(detailValue.replace(/.$/, ''));
                    break;
                // Case for add period
                case '.':
                    if ( ! decimalAdded) {
                        detail.html(detaiValue + keyValue);
                        decimalAdded = true;
                    }
                    break;
                // Case for signing minus/plus to the last calculation
                case '+/-':
                    if (detailValue != '' && $.inArray(lastChar, operators) == -1) {
                        if (lastOperator == '') {
                            if (detailValue == Math.abs(detailValue)) {
                                detail.html(-(detailValue));
                            } else {
                                detail.html(Math.abs(eval(detailValue)));
                            }
                        } else {
                            var array     = detailValue.split(lastOperator),
                                lastIndex = array.length - 1,
                                newDetail = '',
                                oldDetail = '';

                            if (array[lastIndex] == Math.abs(array[lastIndex])) {
                                newDetail = '(' + -(array[lastIndex]) + ')';
                            } else {
                                newDetail = Math.abs(eval(array[lastIndex]));
                            }

                            for (var i = 0; i < lastIndex; i++) {
                                oldDetail += array[i] + lastOperator;
                            }

                            detail.html(oldDetail + newDetail);
                        }
                    }
                    break;
                // Beside of that, just displaying the key value to the calculation
                // This is used for number
                default:
                    detail.html(detailValue + keyValue);
                    break;
            }
        });
    });
});
