class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "0",
            output: "",
            operation: true,
            decimal: false,
            calc: false
        };
        this.eventHandler = this.eventHandler.bind(this);
    }

    eventHandler(event) {
        let input = "";
        let output = "";

        switch (event.target.id) {
            case "clear":
                this.setState({
                    input: "0",
                    output: "",
                    operation: true,
                    decimal: false,
                    negative: false,
                    calc: false
                })
                return;
            case "divide":
                input = "/";
                break;
            case "multiply":
                input = "*"
                break;
            case "subtract":
                input = "-";
                break;
            case "add":
                input = "+";
                break;
            case "zero":
                input = "0";
                break;
            case "one":
                input = "1";
                break;
            case "two":
                input = "2";
                break;
            case "three":
                input = "3";
                break;
            case "four":
                input = "4";
                break;
            case "five":
                input = "5";
                break;
            case "six":
                input = "6";
                break;
            case "seven":
                input = "7";
                break;
            case "eight":
                input = "8";
                break;
            case "nine":
                input = "9";
                break;
            case "decimal":
                input = ".";
                break;
            case "equals":
                input = "=";
                break;
            default:
                return;
        };

        if (parseFloat(input)) {
            if (this.state.input.length == 22) {
                input = this.state.input.substring(0, 22);
                setTimeout(() => {
                    this.setState({
                        input: input,
                    });
                }, 1000)
                this.setState({
                    input: "DIGIT LIMIT MET",
                });
                return;
            } else if (this.state.input == "DIGIT LIMIT MET") {
                return;
            }

            if (this.state.calc) {
                output = input
            } else {
                if (this.state.operation) {
                    output = this.state.output + input;
                } else {
                    if (this.state.input == "0") {
                        output = this.state.output.substring(0, this.state.output.length - 1) + input;
                    } else {
                        output = this.state.output + input;
                        input = this.state.input + input;
                    }
                }
            }

            this.setState({
                operation: false,
                negative: false,
                calc: false
            })

        } else {
            if (input == "0") {
                if (this.state.input.length == 22) {
                    input = this.state.input.substring(0, 22);
                    setTimeout(() => {
                        this.setState({
                            input: input,
                        });
                    }, 1000)
                    this.setState({
                        input: "DIGIT LIMIT MET",
                    });
                    return;
                } else if (this.state.input == "DIGIT LIMIT MET") {
                    return;
                }

                this.setState({
                    negative: false,
                })

                if (this.state.calc) {
                    this.setState({
                        input: "0",
                        output: "",
                        operation: true,
                        decimal: false,
                        negative: false,
                        calc: false
                    })
                    return;

                } else {
                    if (this.state.operation) {
                        output = this.state.output + input;
                        this.setState({
                            operation: false
                        })

                    } else {
                        if (parseFloat(this.state.input) != "0") {
                            output = this.state.output + input;
                            input = this.state.input + input;

                        } else {
                            return;
                        }
                    }

                }


            } else if (input == ".") {
                if (this.state.input.length == 22) {
                    input = this.state.input.substring(0, 22);
                    setTimeout(() => {
                        this.setState({
                            input: input,
                        });
                    }, 1000)
                    this.setState({
                        input: "DIGIT LIMIT MET",
                    });
                    return;
                } else if (this.state.input == "DIGIT LIMIT MET") {
                    return;
                }

                if (this.state.calc) {
                    this.setState({
                        calc: false
                    });
                    input = "0.";
                    output = input;

                } else {
                    if (this.state.decimal) {
                        return;

                    } else {
                        if (this.state.operation) {
                            input = "0.";
                            output = this.state.output + input;

                        } else {
                            output = this.state.output + input;
                            input = this.state.input + input;

                        }
                        this.setState({
                            operation: false,
                            decimal: true
                        })
                    }
                }

            } else if (input == "=") {
                let formula;
                if (this.state.operation) {
                    formula = this.state.output.substring(0, this.state.output.length - 1);

                } else {
                    formula = this.state.output;
                }

                let calculation = Function("return " + formula.replace(/ /g, "").replace(/--/g, "- -"))();
                input = calculation;
                output = formula + "=" + calculation;

                let lines = output.split(" ");
                let lastLine = lines.pop();
                let n = parseInt(lastLine.length / 32);
                let newItem = "";
                for (let i = 0; i <= n; i++) {
                    newItem = newItem + " " + lastLine.substring(i * 32, (i + 1) * 32)
                }
                lines.push(newItem);
                output = lines.join(" ");
                this.setState({
                    operation: true,
                    calc: true
                })

            } else {
                if (this.state.calc) {
                    output = this.state.input + input;
                    this.setState({
                        calc: false
                    });

                } else {
                    if (input == "-") {
                        if (this.state.operation) {
                            if (this.state.negative) {
                                return;

                            } else {
                                this.setState({
                                    negative: true
                                });
                                output = this.state.output + input;
                            };

                        } else {
                            this.setState({
                                operation: true,
                                decimal: false
                            });
                            output = this.state.output + input;

                        }

                    } else {
                        if (this.state.operation) {
                            if (this.state.negative) {
                                output = this.state.output.substring(0, this.state.output.length - 2) + input;
                                this.setState({
                                    negative: false
                                });

                            } else {
                                output = this.state.output.substring(0, this.state.output.length - 1) + input;

                            }
                        } else {
                            this.setState({
                                operation: true,
                                decimal: false
                            });
                            output = this.state.output + input;

                        }
                    }
                }
            }
        }


        if (!(output.replace(/ /g, "").length % 32)) {
            output = output + " ";
        }

        this.setState({
            input: input,
            output: output
        });
    }

    render() {
        let output = this.state.output.split(" ");
        let lines = output.map(line => {
            return (
                <Output key={line} line={line} />
            )
        });

        return (
            <div id="calculator">

                <div id="output">
                    {lines}
                </div>

                <div id="display">
                    {this.state.input}
                </div>
                <div id="clickables">
                    <a id="clear" className="clickable" onClick={this.eventHandler}>AC</a>
                    <a id="divide" className="clickable" onClick={this.eventHandler}>/</a>
                    <a id="multiply" className="clickable" onClick={this.eventHandler}>x</a>
                    <a id="seven" className="clickable" onClick={this.eventHandler}>7</a>
                    <a id="eight" className="clickable" onClick={this.eventHandler}>8</a>
                    <a id="nine" className="clickable" onClick={this.eventHandler}>9</a>
                    <a id="subtract" className="clickable" onClick={this.eventHandler}>-</a>
                    <a id="four" className="clickable" onClick={this.eventHandler}>4</a>
                    <a id="five" className="clickable" onClick={this.eventHandler}>5</a>
                    <a id="six" className="clickable" onClick={this.eventHandler}>6</a>
                    <a id="add" className="clickable" onClick={this.eventHandler}>+</a>
                    <a id="one" className="clickable" onClick={this.eventHandler}>1</a>
                    <a id="two" className="clickable" onClick={this.eventHandler}>2</a>
                    <a id="three" className="clickable" onClick={this.eventHandler}>3</a>
                    <a id="equals" className="clickable" onClick={this.eventHandler}>=</a>
                    <a id="zero" className="clickable" onClick={this.eventHandler}>0</a>
                    <a id="decimal" className="clickable" onClick={this.eventHandler}>.</a>
                </div>
            </div>
        )
    }
}

function Output(props) {
    return (
        <div><span>{props.line}</span></div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="container">
                <Calculator />
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
