import React from 'react';
import './App.css';

const isOperator = /[*/+-]/,
isOperatorPositive = /[*/+]/;

class Navbar extends React.Component {
  render (){
    return (
      <div className="navbar">
        <a href="https://github.com/kvo189/calculator">View On Github</a>
      </div>
    );
  }
}

class Button extends React.Component {
	render(){
		return (
			<button id = {this.props.id} value={this.props.value} onClick={this.props.onClick} className={this.props.className}>
				{this.props.value}
			</button>
		)
	}
}

class App extends React.Component {
  constructor(props){
    super(props);
		this.state = {
			display: '0',
      currentNum: '0',
			previousInput: null,
			evaluated: true
		}
		this.handleClear = this.handleClear.bind(this);
		this.handleNumbers = this.handleNumbers.bind(this);
		this.handleOperators = this.handleOperators.bind(this);
		this.handleEquals = this.handleEquals.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleZero = this.handleZero.bind(this);
    
  }
	
	handleClear() {
		this.setState({
			display: '0',
      currentNum: '0',
			previousInput: null,
			evaluated: true
		});
	}
	
	handleNumbers(e) {
    const val = e.target.value;
    const {display, evaluated, currentNum} = this.state;
    if (currentNum.length >= 10) return;
		this.setState({
			display: (evaluated) 
				? val 
				: display + val,
			previousInput: val,
      evaluated: false,
      currentNum: (evaluated) 
        ? val 
        : currentNum + val,
		});
  }

  handleZero() {
    const {display, previousInput, currentNum} = this.state;
    if (previousInput === null) return;

    this.setState({
			display: display + "0",
			previousInput: "0",
			evaluated: false,
      currentNum: currentNum + "0"
		});
  }
  
	handleOperators(e) {
		const val = e.target.value;
    let nextOp = this.state.display;
    if (this.state.previousInput === '.') return;
		if (val === '-'){
			if (this.state.previousInput === '-'){
				return;
			}else{
				nextOp += val;
			}
		}else{
			if (isOperator.test(nextOp.slice(-1)) && isOperator.test(nextOp.slice(-2,nextOp.length-1))){
				nextOp = nextOp.slice(0,-2) + val;
			}else if (isOperator.test(this.state.previousInput)){
				nextOp = nextOp.slice(0,-1) + val;
			}else{
				nextOp += val;
			}
		}
		this.setState({
			display: nextOp,
			previousInput: val,
			evaluated: false,
      currentNum: "0"
		});
  }
  
	handleEquals() {
    if (isOperator.test(this.state.previousInput)) return;
    if(this.state.previousInput === ".") return;
		this.setState({
			display: eval((this.state.display)).toString(),
			previousInput: null,
			evaluated: true,
      currentNum: eval((this.state.display)).toString()
		});
  }
  
	handleDecimal() {
    if (this.state.currentNum.includes(".")) return;
		this.setState({
			display: this.state.display + ".",
			previousInput: '.',
			evaluated: false,
      currentNum: this.state.currentNum + "."
		});
  }
  
  render(){
    const displayFontSize = (this.state.display.length > 15) ? "small" : "large";
    return (
      <div className="App">
        <Navbar/>
  
        <header className="App-header">
          React Calculator App
        </header>
  
        <div className="App-body">
          <div className="Calculator">
            <div className="Screen">
              <div className={"Screen-display " + displayFontSize}>
                {this.state.display}
              </div>
              {/* <div className="Screen-input">
                {this.state.currentNum}
              </div> */}
            </div>
            <div className="Buttons">
              <Button id='clear' value='AC' onClick={this.handleClear}/>
              <Button id='divide' value='/' onClick={this.handleOperators} className='btn-operator'/>
              <Button id='multiply' value='*' onClick={this.handleOperators} className='btn-operator'/>
              <Button id='seven' value='7' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='eight' value='8' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='nine' value='9' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='subtract' value='-' onClick={this.handleOperators} className='btn-operator'/>
              <Button id='four' value='4' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='five' value='5' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='six' value='6' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='add' value='+' onClick={this.handleOperators} className='btn-operator'/>
              <Button id='one' value='1' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='two' value='2' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='three' value='3' onClick={this.handleNumbers} className='btn-number'/>
              <Button id='equals' value='=' onClick={this.handleEquals}/>
              <Button id='zero' value='0' onClick={this.handleZero} className='btn-number'/>
              <Button id='decimal' value='.' onClick={this.handleDecimal} className='btn-number'/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
