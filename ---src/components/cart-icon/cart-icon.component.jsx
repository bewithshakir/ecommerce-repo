import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ({toggleCartHidden, itemCount}) => {
  console.log('icon render')
  return (
    <div className='cart-icon'>
      <ShoppingIcon className='shopping-icon' onClick={toggleCartHidden}/>
      <span className='item-count'>{itemCount}</span>
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
});

const maptStateToProps = createStructuredSelector( {
  itemCount: selectCartItemsCount
})
export default connect(
  maptStateToProps,
  mapDispatchToProps
)(CartIcon);
