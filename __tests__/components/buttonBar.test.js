import * as React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import ButtonBar from '@components/buttonBar'
import configureMockStore from 'redux-mock-store'
const mockStore = configureMockStore()

const props = {
  formStep: {
    "fields" : [
      {
        "id":"name",
        "required":true,
      },
      {
        "id":"role",
        "required":false,
      },
      {
        "id":"email",
        "required":true,
      }
    ]
  },
  step: 0,
  updateStep: jest.fn()
}

describe('button Bar', () =>{
  describe('Missing Data', () => {
    const store = mockStore(() => state)
    const state = {
      form: {}
    }
    it('incomplete data first step should not allow clicking on the next button, prev hidden', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ButtonBar {...props}/>
        </Provider>
      )
      expect(wrapper.find({children:'Previous'}).prop('className')).toBe('hidden')
      expect(wrapper.find({type:'submit'}).prop('disabled')).toBe(true)

      wrapper.find({type:'submit'}).simulate('click')
      expect(props.updateStep).toHaveBeenCalledTimes(0)
    })
    it('second step should have previsous button visible and callable', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ButtonBar {...props} step={1}/>
        </Provider>
      )
      expect(wrapper.find({children:'Previous'}).prop('className')).toBe('')
      wrapper.find({children:'Previous'}).simulate('click')
      expect(props.updateStep).toHaveBeenCalledWith(-1)
    })
    it('incomplete data should not grant submit button active ', () => {
      const store = mockStore(() => state)
      const state = {
        form: {
          name : 'luke',
          role : 'jedi'
        }
      }
      const wrapper = mount(
        <Provider store={store}>
          <ButtonBar {...props} />
        </Provider>
      )
      expect(wrapper.find({type:'submit'}).prop('disabled')).toBe(true)
    })
  })
  describe('Complete Data', () => {
    const store = mockStore(() => state)
    const state = {
      form: {
        name : 'luke',
        email : 'luke@jediorder.space'
      }
    }
    it('required data fullfiled first step should allow clicking on the next button', () => {
      const wrapper = mount(
        <Provider store={store}>
          <ButtonBar {...props}/>
        </Provider>
      )
      expect(wrapper.find({type:'submit'}).prop('disabled')).toBe(false)
      wrapper.find({type:'submit'}).simulate('click')
      expect(props.updateStep).toHaveBeenCalledWith(1)
    })
  })
})
