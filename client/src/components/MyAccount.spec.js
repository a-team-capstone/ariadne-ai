import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import MyAccount from './MyAccount'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('MyAccount', () => {
	let myAccount

	beforeEach( () => {
		myAccount = shallow(<MyAccount user={{userName:"Blitz"}} />)
	})

	it('renders an h4 with the correct username', () => {
		expect(myAccount.find('h4').text()).toEqual('Blitz')
	})

})