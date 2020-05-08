import * as React from 'react'
import { shallow, mount } from 'enzyme'
import FormFields from '@components/formFields'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

const props = {
  formStep: {
    "fields" : [
      {
        "id":"name",
        "required":true,
        "field":"input",
        "label":"name"
      },
      {
        "id":"role",
        "required":false,
        "field":"input",
        "label":"Role"
      },
      {
        "id":"memberOfJediOrder",
        "required":true,
        "field":"checkbox",
        "label":"I am a jedi"
      }
    ]
  }
}

const store = mockStore(() => state)
const state = {
  form: {
    data: {}
  }
}

describe('Form Fields', () =>{
    it('should render three nested components, 2 inputs and 1 checkbox', () => {
      const wrapper = mount(
          <Provider store={store}>
            <FormFields {...props}/>
          </Provider>
      )
      expect(wrapper.find('.form__fields').children().length).toBe(3)
      expect(wrapper.find('.field__input').length).toBe(2)
      expect(wrapper.find('.field__checkbox').length).toBe(1)
    })
    it('changing an item should call redux action', () => {
      const actions = store.getActions()
      const wrapper = mount(
        <Provider store={store}>
          <FormFields {...props}/>
        </Provider>)
      wrapper.find('.field__checkbox').simulate('change', { target: { checked: true } })
      expect(actions).toEqual([{"payload": {"memberOfJediOrder": true}, "type": "SET_VALUE"}])

      wrapper.find('.field__checkbox').simulate('change', { target: { checked: false } })
      expect(actions).toEqual([
        {"payload": {"memberOfJediOrder": true}, "type": "SET_VALUE"},
        {"payload": {"memberOfJediOrder": null}, "type": "SET_VALUE"}
      ])
  })
})
