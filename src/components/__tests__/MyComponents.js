/**
 * @format
 */

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Text, View } from 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import MyComponent, { styles } from '../MyComponents';


configure({ adapter: new Adapter() });


describe('All MyButton Tests', () => {

  /*
   * This is a snapshot test. It basically creates a rendered snapshot of the
   * rendered UI to later test in case we want to make sure other changes do
   * not modify our screens unexpectedly. 
   *
   * Snapshots must be included in git.
   *
   * We test with:
   * yarn test
   *
   * If we indeed updated our screen, we will need to update our snapshots:
   * yarn test -u
   *
   */
  it('renders correctly', () => {
    const tree = renderer.create(<MyComponent />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  /*
   * Here we get a shallow representation of a component. The shallow
   * method will mount this component as if we were rendering it,
   * allowing us to even add props and check how they affect the final
   * rendered object.
   */
  it('doesnt have description.', () => {
    const wrapper = shallow(<MyComponent description='My desc'/>);

    let items = wrapper.find({style: styles.item});
    expect(items.length).toBe(1);
    expect(wrapper.contains(<Text>'My desc'</Text>)).toBe(false);

  });

  /*
   * Also mounting the shallow object, only this case we want to test the
   * specific method we have.
   */
  it('has description using instances.', () => {
    const wrapper = shallow(<MyComponent description='My desc'/>);

    // Create a regular instance of the shallowed object.
    const instance = wrapper.instance();
    // Before we do anything, let's make sure that we have the default
    // rendered object. Also, instances allow us to check instance state
    // objects.
    expect(instance.state.isSelected).toBe(false)
    // Find text area with description.
    let items = wrapper.find({style: styles.back});
    expect(items.length).toEqual(0);
    // Simulate touch by calling the method.
    instance.selectRepo();
    // Test that state was changed.
    expect(instance.state.isSelected).toBe(true)
    // Find text area with description.
    items = wrapper.find({style: styles.back});
    expect(items.dive().text()).toEqual('My desc');
  });

  /*
   * Also mounting the shallow object, only this case we want to test the
   * specific method we have.
   */
  it('has description when pressing component.', () => {
    const wrapper = shallow(<MyComponent description='My desc'/>);

    // Find text area with description.
    let items = wrapper.find({style: styles.back});
    expect(items.length).toEqual(0);
    // Simulate touch by calling the method.
    wrapper.simulate('press');
    // Check again after pressing the button.
    items = wrapper.find({style: styles.back});
    // Dive into the Text area and checn that it has the given
    // description.
    expect(items.dive().text()).toEqual('My desc');
  });
});
