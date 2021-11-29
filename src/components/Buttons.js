import React, { Component } from "react";
export class Buttons extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();

    this.state = {
      input1: "",
      operator: "",
      input2: "",
      inputComplete: false,
      onePointInput1: false,
      onePointInput2: false,
      operatorChosen: false,
      negativeInput1: false,
      negativeInput2: false,
      answer: "",
    };

    this.inputCompletion = this.inputCompletion.bind(this);
  }

  inputCompletion(event) {
    let numberVar = Number(event.target.textContent);
    let stringVar = event.target.textContent;
    let onePointInput1 = this.state.onePointInput1;
    let onePointInput2 = this.state.onePointInput2;
    let inputComplete = this.state.inputComplete;
    let operatorChosen = this.state.operatorChosen;
    let negativeInput1 = this.state.negativeInput1;
    let negativeInput2 = this.state.negativeInput2;
    let input1 = this.state.input1;
    let input2 = this.state.input2;
    let operator = this.state.operator;
    // let answer = this.state.answer;
    // let negativeInput2 = this.state.negativeInput2;

    if (!isNaN(numberVar) || stringVar === ".") {
      if (!isNaN(numberVar)) {
        let pushedNum = numberVar;
        if (!inputComplete) {
          this.setState({
            input1: String(this.state.input1 + pushedNum),
          });
          console.log("You pushed a Number to input 1");
        } else if (inputComplete) {
          this.setState({
            input2: String(this.state.input2 + pushedNum),
          });
          console.log("You pushed a Number to input 2");
        }
      }
    }
    if (isNaN(numberVar)) {
      let pushedDec = stringVar;

      if (
        !onePointInput1 &&
        !inputComplete &&
        (pushedDec === "." || pushedDec === "+/-")
      ) {
        if (pushedDec === ".") {
          if (this.state.input1) {
            this.setState({ input1: String(this.state.input1 + pushedDec) });
            this.setState({ onePointInput1: true });
            console.log("You pushed a Decimal to input 1");
          } else if (!this.state.input1) {
            this.setState({ input1: pushedDec });
            this.setState({ onePointInput1: true });
            console.log("You pushed a Decimal to input 1");
          }
        }
        if (pushedDec === "+/-") {
          //check if it's null first in the outermost conidiitonals & check for post / negative later ya feel me
          if (!this.state.input1) {
            if (!negativeInput1) {
              //set state to make it negative & set the var to true
              this.setState({ input1: "-" });
              this.setState({ negativeInput1: true });
            } else if (negativeInput1) {
              //set state to positive & set the var to false
              this.setState({ input1: null });
              this.setState({ negativeInput1: false });
            }
          } else if (this.state.input1) {
            if (!negativeInput1) {
              //set state to negative and set the var to true;
              this.setState({ input1: String("-" + input1) });
              this.setState({ negativeInput1: true });
            } else if (negativeInput1) {
              let positiveVersion = this.state.input1.slice(1);
              this.setState({ input1: positiveVersion });
              // set the state to positive and set the var to true
              this.setState({ negativeInput1: false });
            }
          }
        }
      }
      if (
        !onePointInput2 &&
        inputComplete &&
        (pushedDec === "." || pushedDec === "+/-")
      ) {
        if (pushedDec === ".") {
          if (this.state.input2) {
            //type it here [negative piece]
            this.setState({ input2: String(this.state.input2 + pushedDec) });
            this.setState({ onePointInput2: true });
            console.log("You pushed a Decimal to input 2");
          } else if (!this.state.input2) {
            //type it here [negative piece]
            this.setState({ input2: pushedDec });
            this.setState({ onePointInput2: true });
            console.log("You pushed a Decimal to input 2");
          }
        } else if (pushedDec === "+/-") {
          if (!this.state.input2) {
            if (!negativeInput2) {
              //set state to make it negative & set the var to true
              this.setState({ input2: "-" });
              this.setState({ negativeInput2: true });
            } else if (negativeInput2) {
              //set state to positive & set the var to false
              this.setState({ input2: null });
              this.setState({ negativeInput2: false });
            }
          } else if (this.state.input2) {
            if (!negativeInput2) {
              //set state to negative and set the var to true;
              this.setState({ input2: String("-" + input2) });
              this.setState({ negativeInput2: true });
            } else if (negativeInput2) {
              let positiveVersion = this.state.input2.slice(1);
              this.setState({ input2: positiveVersion });
              // set the state to positive and set the var to true
              this.setState({ negativeInput2: false });
            }
          }
        }
      }

      if (
        stringVar !== "=" &&
        stringVar !== "+/-" &&
        stringVar !== "CE" &&
        stringVar !== "." &&
        stringVar !== "%" &&
        !operatorChosen
      ) {
        console.log("You clicked an operator");
        this.setState({ inputComplete: true });
        this.setState({ operatorChosen: true });
        console.log(this.state.input1, "from operator branch");
        this.setState({ operator: stringVar });
        console.log(this.state.inputComplete);
      } else if (stringVar === "=") {
        console.log("The equals sign was pressed");
        if (operator === "X") {
          console.log("You clicked the multiplication");
          this.setState({ answer: Number(input1 * input2) });
        } else if (operator === "/") {
          this.setState({ answer: Number(input1 / input2) });
        } else if (operator === "-") {
          this.setState({ answer: Number(input1 - input2) });
        } else if (operator === "+") {
          this.setState({ answer: Number(input1) + Number(input2) });
        }
      } else if (stringVar === "%") {
        console.log("You wanted to divide by 100");
        if (!this.state.inputComplete) {
          this.setState({ input1: Number(input1 / 100) });
        } else if (this.state.inputComplete) {
          this.setState({ input2: Number(input2 / 100) });
        }
      } else if (stringVar === "CE") {
        this.setState({ input1: null });
        this.setState({ input2: null });
        this.setState({ onePointInput1: false });
        this.setState({ onePointInput2: false });
        this.setState({ inputComplete: false });
        this.setState({ operator: null });
        this.setState({ answer: null });
        this.setState({ operatorChosen: false });
      }
    }
  }

  render() {
    const btnChars = {
      row1: ["CE", "+/-", "%", "/"],
      row2: [7, 8, 9, "X"],
      row3: [4, 5, 6, "-"],
      row4: [1, 2, 3, "+"],
      row5: [0, ".", "="],
    };
    let pushedBtnArr = [];

    const btnArr = Object.values(btnChars);

    for (let array = 0; array <= Object.keys(btnChars).length - 1; array++) {
      let currArr = btnArr[array];
      for (let string = 0; string <= currArr.length - 1; string++) {
        let currStr = currArr[string];
        pushedBtnArr.push(
          <button onClick={this.inputCompletion}>{currStr}</button>
        );
      }

      if (array >= Object.keys(btnChars).length - 1) {
        return (
          <div>
            <div className="Output-Screen">
              <h1>
                {this.state.input1} {this.state.operator} {this.state.input2} =
                {this.state.answer}
              </h1>
            </div>
            <div className="The_Buttons">{pushedBtnArr}</div>
          </div>
        );
      }
    }
  }
}

export default Buttons;
