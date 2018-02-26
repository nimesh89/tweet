import './main.scss';
import * as React from 'react';
import * as ReactDom from 'react-dom';

class Main extends React.Component {
    render() {
        return (<div>Test1</div>);
    }
}

ReactDom.render(<Main></Main>, document.getElementById("react-container"));