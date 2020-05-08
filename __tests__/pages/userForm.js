import * as React from 'react'
import { shallow } from 'enzyme'
import UserForm from '@pages/userForm'
import ButtonBar from '@components/buttonBar'
import CompletionBlock from '@components/completionBlock'

describe('User Form' ,() => {
  it('renders correct items' ,() => {
    const wrapper = shallow(<UserForm />) // lets keep it shallow to avoid setting a provider
    expect(wrapper.find('.form').children().length).toBe(2)
    expect(wrapper.find('.form__container').exists()).toBe(true)
    expect(wrapper.find(CompletionBlock).exists()).toBe(false)
  })
  it('jump to last step should display form completion instead' ,() => {

    const wrapper = shallow(<UserForm />) // lets keep it shallow to avoid setting a provider

    wrapper.find(ButtonBar).prop('updateStep')(1) // lets jump straight to last step
    wrapper.find(ButtonBar).prop('updateStep')(1)
    expect(wrapper.find('.form__container').exists()).toBe(false)
    expect(wrapper.find(CompletionBlock).exists()).toBe(true)
  })
})
