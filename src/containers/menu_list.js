import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectItem } from '../actions/index';

// Render menu and food categories
class MenuList extends Component {
  renderMenu() {
    return this.props.menu.map((item) => {
      return (
        <li
          key={item.name}
          className={item.draw ? '' : 'menuList--card__notActive'}
          onClick={() => this.props.selectItem(item)}
        >
          <img src={`./public/icons/${item.img}.png`} alt="" />
          <h3>{item.display}</h3> <br />
          <p>{item.products[0]}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <h2>Wylosowane składniki</h2>
        {this.props.error.message ? <p className="menuList--errorMessage">{this.props.error.message}</p> : ''}
        <div className="menuList--result">Kalorie: <p>{!this.props.error.message ? this.props.summary.kcal || '-' : '-'}</p></div>
        <div className="menuList--result">Cena: <p>{!this.props.error.message ? this.props.summary.price || '-' : '-'}</p></div>
        <ul>
          {this.props.menu ? this.renderMenu() : ''}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    menu: state.menu,
    summary: state.summary,
    error: state.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectItem }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);
