class HelloMessage extends React.Component {
    render() {
        return (
            <div className="hello-Wrapper">
                <div>Hello, it is {this.props.hello}</div>
            </div>
        )
    }
}

module.exports = HelloMessage;
