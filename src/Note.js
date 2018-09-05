import React, { Component }
from 'react'

class Note extends Component {

    constructor(props) {
        super(props)
        this.state= {
            editing: false
        }
        this.edit = this.edit.bind(this)
        this.remove = this.remove.bind(this)
        this.save = this.save.bind(this)
        this.renderForm = this.renderForm.bind(this);
        this.randomBetween = this.randomBetween.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
    }
    componentWillMount() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 150, 'px'),
			top: this.randomBetween(0, window.innerHeight - 150, 'px'),
			transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
		}
	}

    componentDidUpdate(){
        var textArea;
        if(this.state.editing){
            textArea = this._newText
            textarea.focus()
            textArea.select()
        }
    }

    edit(){
        this.setState({
            editing: true
        })
    }
    save(e){
        e.preventDefault()
        this.props.onChange(this._newText.value, this.props.index)
        this.setState({
            editing: false
        })
    }
    
    remove(){
        this.props.onRemove(this.props.index);
    }

    randomBetween(x, y, s){
        return x+ Math.ceil(Math.random() * (y-x)) + s
    }

    renderForm() {

        return (
            <div className = "note" style={this.style}>
                <form onSubmit={this.save}>
                    <textarea ref={input => this._newText = input}
                        defaultValue={TextTrackList.props.children}    />
                    <button>Save</button>
                </form>
            </div>
        )
    }
    renderDisplay() {
        
        return ( 
            <div className = "note" style={this.style}>
            <p>{this.props.children}</p>
            <span>
            <button onClick={this.remove} id="remove">Remove</button> 
            <button onClick={this.edit} id="edit">Edit</button> 
            </span> 
            </div>
        )
    }

    render(){
        return this.state.editing ? this.renderForm() : this.renderDisplay()
    }
}

export default Note