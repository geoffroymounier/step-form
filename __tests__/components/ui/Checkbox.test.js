import * as React from 'react'
import { shallow, } from 'enzyme'
import Checkbox from '@components/ui/checkbox'

const props = {
  label : 'is a Jedi Member',
  id : 'isJediMember',
  field:'checkbox',
  required:true,
  changeValue : jest.fn()
}

describe('Input UI Component', () =>{
  describe('Correct rendering of items', () => {
    it('should render correct input with corresponding label', () => {
      const wrapper = shallow(
          <Checkbox {...props}/>
      )
      expect(wrapper.find('label').text()).toBe('is a Jedi Member*')
      expect(wrapper.find('input').prop('type')).toBe('checkbox')
      expect(wrapper.find('.form__error--item').exists()).toBe(false)

    })
  })
  describe('Correct events for component', () => {
    it('should call onChange with null for required unfulfilled data, and should display error', () => {
      const wrapper = shallow(
          <Checkbox {...props} defaultValue={true}/>
      )
      wrapper.find('input').simulate('change', { target: { checked: false } })
      expect(props.changeValue).toHaveBeenCalledWith('isJediMember',null)
      expect(wrapper.find('.form__error--item').text()).toBe('is a Jedi Member must be checked')
    })
    it('should call for onChange with right data', () => {
      const wrapper = shallow(
          <Checkbox {...props}/>
      )
      wrapper.find('input').simulate('change', { target: { checked: true } })
      expect(props.changeValue).toHaveBeenCalledWith('isJediMember',true)
      expect(wrapper.find('.form__error--item').exists()).toBe(false)
    })
    it('should call onChange with the provided data and not throw any error', () => {
      const wrapper = shallow(
          <Checkbox {...props} required={false}/>
      )
      expect(wrapper.find('label').text()).toBe('is a Jedi Member')
      wrapper.find('input').simulate('change', { target: { checked: true } })
      expect(props.changeValue).toHaveBeenCalledWith('isJediMember',true)


      wrapper.find('input').simulate('change', { target: { checked: false } })
      expect(wrapper.find('.form__error--item').exists()).toBe(false)

    })

  })
})
