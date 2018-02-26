import './main.scss';
import * as React from 'react';
import * as ReactDom from 'react-dom';
class Main extends React.Component {
    render() {
        return (React.createElement("div", null, "Test1"));
    }
}
ReactDom.render(React.createElement(Main, null), document.getElementById("react-container"));
//# sourceMappingURL=main.js.map