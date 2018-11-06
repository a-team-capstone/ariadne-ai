import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'

import Adapter from 'enzyme-adapter-react-16'
import Profile from './Profile'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Profile', () => {
	let Profile

	beforeEach( () => {
		Profile = shallow(<Profile user={{userName:"Blitz"}} />)
	})

	it('renders an h4 with the correct username', () => {
		expect(Profile.find('h4').text()).toEqual('Blitz')
	})

})