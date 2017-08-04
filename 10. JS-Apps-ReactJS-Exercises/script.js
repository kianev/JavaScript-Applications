let HelloMessage = require("./HelloMessage.js");

let array = [
    1,2,3,4,5,6,7,8,9,10
];

class Main extends React.Component {
    render() {
        return (
            <div className="homeWrapper">
                <div>This is the homepage1</div>
                <HelloMessage hello="Dave"/>
                {array.map((element) =>
                <div>{element}</div>)}
            </div>
        )
    }
}

ReactDOM.render(
    <Main/>,
    $("#app")[0]);

