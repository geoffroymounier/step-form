import * as React from 'react'
import { shallow, } from 'enzyme'
import Input from '@components/ui/input'

const props = {
  label : 'email',
  id:'email',
  field:'input',
  required:true,
  extraProps: {
    placeholder:'enter you email',
    type:'email',
    regex: '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$',
    regexError: 'this is not a valid email'
  },
  changeValue : jest.fn()
}

describe('Input UI Component', () =>{
  describe('Correct rendering of items', () => {
    it('should render correct input with corresponding label', () => {
      const wrapper = shallow(
          <Input {...props}/>
      )
      expect(wrapper.find('label').text()).toBe('email*')
      expect(wrapper.find('input').prop('type')).toBe('email')
      expect(wrapper.find('input').prop('placeholder')).toBe('enter you email')
      expect(wrapper.find('.form__error--item').exists()).toBe(false)

    })
  })
  describe('Wrong value inputed on the component', () => {
    it('should not call onChange for empty data, but should show error untill blur', () => {
      const wrapper = shallow(
          <Input {...props}/>
      )
      wrapper.find('input').simulate('change', { target: { value: '' } })
      expect(props.changeValue).toHaveBeenCalledTimes(0)
      expect(wrapper.find('.form__error--item').exists()).toBe(false)

      wrapper.find('input').simulate('blur', { target: { value: '' }})
      expect(wrapper.find('.form__error--item').text()).toBe('email field is required')
    })
    it('should call onChange for wrong data input from a previous right Data', () => {
      const wrapper = shallow(
          <Input {...props} defaultValue={'goodemail@test.com'} />
      )
      wrapper.find('input').simulate('change', { target: { value: 'wrongemail@@test.com' } })
      expect(props.changeValue).toHaveBeenCalledWith('email',null)
      expect(wrapper.find('.form__error--item').exists()).toBe(false)
    })
  })
  describe('Correct value inputed on the component (testing password)', () => {
    const props = {
      label: 'password',
      id:'password',
      field:'input',
      required:true,
      extraProps : {
        placeholder:'enter you password',
        type:'password',
        regex: '(?=^.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s).*$',
        regexError: 'this is a weak password'
      },
      changeValue : jest.fn()
    }
    it('should call onChange for filling good data', () => {
      const wrapper = shallow(
          <Input {...props}/>
      )
      wrapper.find('input').simulate('change', { target: { value: 'LionelMessi10' } })
      expect(props.changeValue).toHaveBeenCalledWith('password','LionelMessi10')
    })
    it('should call onChange and clear error field as soon as user corrects his mistake filling good data', () => {
      const wrapper = shallow(
          <Input {...props}/>
      )
      wrapper.find('input').simulate('blur', { target: { value: 'ZinedineZidane10' } })
      expect(wrapper.find('.form__error--item').exists()).toBe(false)

      wrapper.setProps({defaultValue:'ZinedineZidane10'})

      wrapper.find('input').simulate('change', { target: { value: 'CR7' } })
      expect(props.changeValue).toHaveBeenCalledWith('password',null)
      wrapper.find('input').simulate('blur', { target: { value: 'CR7' } })
      expect(wrapper.find('.form__error--item').text()).toBe('this is a weak password')

      wrapper.find('input').simulate('change', { target: { value: 'LionelMessi10' } })
      expect(props.changeValue).toHaveBeenCalledWith('password','LionelMessi10')
      expect(wrapper.find('.form__error--item').exists()).toBe(false)

    })
  })
})
