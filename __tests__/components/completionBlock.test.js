import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import CompletionBlock from '@components/completionBlock'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()


describe('completionBlock', () =>{
    it('should render correct text', () => {
      const state = {}
      const store = mockStore(() => state)
      const wrapper = mount(
        <Provider store={store}>
          <CompletionBlock />
        </Provider>
      )
      expect(wrapper.find('h2').text()).toBe('✔')
      expect(wrapper.find('p').text()).toBe('Please verify your email address, you should have received an email from us already')
    })
})
