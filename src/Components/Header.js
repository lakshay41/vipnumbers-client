import React, { Component } from 'react';
import './Header.css'
class Header extends Component {
    render() {
        return (
            <div className="header">
                <a href="/"><img alt=".." src="https://scontent.fixc8-1.fna.fbcdn.net/v/t1.6435-9/123712906_3754346687910831_8482950011315101681_n.jpg?_nc_cat=100&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=hYAMYQGyM2sAX-5zd2R&_nc_ht=scontent.fixc8-1.fna&oh=6352b36dd62a39585c5bebf072d673a0&oe=60FA6AB0"></img></a>
                <div className="title">
                    <h1>VIP NUMBERS</h1>
                    <h4>Haryana</h4>
                </div>
            </div>
        );
    }
}

export default Header;