import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ContentLoader from './ContentLoader';

Enzyme.configure({ adapter: new Adapter() });

describe('shared/containers/ContentLoader', () => {
  test('should render a paragraph tag with loader-text class when isLoading prop is set to TRUE', () => {
    const wrapper = shallow(
      <ContentLoader isLoading>
        <div>Content</div>
      </ContentLoader>
    );

    expect(wrapper.find('p.loader-text')).toHaveLength(1);
  });

  test('should render a paragraph tag that reads default text from contentLoaderText prop', () => {
    const wrapper = shallow(
      <ContentLoader
        isLoading
        contentLoaderText="Is loading..."
      >
        <div>Content</div>
      </ContentLoader>
    );

    expect(wrapper.find('p.loader-text').text()).toEqual('Is loading...');
  });

  test('should render a paragraph tag that reads "Loading..." from contentLoaderText prop', () => {
    const wrapper = shallow(
      <ContentLoader
        isLoading
        contentLoaderText="Loading..."
      >
        <div>Content</div>
      </ContentLoader>
    );

    expect(wrapper.find('p.loader-text').text()).toEqual('Loading...');
  });

  test('should render a graphic from contentLoaderGraphic prop', () => {
    const graphicRenderer = () => <div className="graphic">graphic</div>;
    const Graphic = graphicRenderer();
    const wrapper = shallow(
      <ContentLoader
        isLoading
        contentLoaderGraphic={Graphic}
      >
        <div>Content</div>
      </ContentLoader>
    );

    expect(wrapper.find('.graphic')).toHaveLength(1);
  });

  test('should render content when isLoading is set to FALSE', () => {
    const wrapper = shallow(
      <ContentLoader
        isLoading={false}
      >
        <div className="content">Content</div>
      </ContentLoader>
    );

    expect(wrapper.find('.content')).toHaveLength(1);
  });
});
