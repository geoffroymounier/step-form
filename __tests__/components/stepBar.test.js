import * as React from 'react'
import { shallow, mount } from 'enzyme'
import StepBar from '@components/stepBar'

const props = {
  formData: [
    {name:"First Step"},
    {name:"Second Step"},
    {name:"Third Step"}
  ],
  step: 0
}

describe('step Bar', () =>{
  describe('Correct number of items', () => {
    it('should render as many items as defined in the formData, plus the done one', () => {
      const wrapper = shallow(
          <StepBar {...props}/>
      )
      expect(wrapper.find('div').length).toBe(4)
      expect(wrapper.find('header').text()).toBe('First StepSecond StepThird StepDone')
    })
    it('should underline the corresponding index item regarding which step it is, with only 1 item active', () => {
      const wrapper = shallow(
          <StepBar {...props}/>
      )
      expect(wrapper.find({children:"First Step"}).prop('className')).toBe('active')
      wrapper.setProps({step:3})

      expect(wrapper.find({children:"First Step"}).prop('className')).toBe('')
      expect(wrapper.find({children:"Done"}).prop('className')).toBe('active')
      expect(wrapper.find('div.active').length).toBe(1)

    })

  })
})
