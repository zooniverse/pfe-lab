import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import sinon from 'sinon';
import path from 'path';

import ImageSelector from '../../../src/modules/common/containers/image-selector';

const imageFile = path.join(__dirname, 'src/images/zooniverse-icon-web-white-small.png');

const resource = {
  src: 'image.png'
};

describe('<ImageSelector />', function() {
  it('should render', function() {
    const wrapper = shallow(<ImageSelector />);
    expect(wrapper.instance()).to.be.an.instanceof(ImageSelector);
  });

  it('should render <FileButton />', function() {
    const wrapper = mount(<ImageSelector />);
    expect(wrapper.find('FileButton')).to.have.lengthOf(1);
  });

  it('should not have a label', function() {
    const wrapper = shallow(<ImageSelector />);
    expect(wrapper.find('.image-selector__label')).to.have.lengthOf(0);
  });

  it('should have a label if label prop is defined', function() {
    const wrapper = shallow(<ImageSelector label="Selector Label" />);
    expect(wrapper.find('.image-selector__label')).to.have.lengthOf(1);
  });

  describe('if resource src is a prop', function() {
    let wrapper;
    const onDeleteSpy = sinon.spy();

    before(function() {
      wrapper = mount(<ImageSelector resourceSrc={resource.src} onDelete={onDeleteSpy} />);
    });

    it('should have class .image-selector__uploader--without-border', function() {
      expect(wrapper.find('.image-selector__uploader--without-border')).to.have.lengthOf(1);
    });

    it('should render <Thumbnail />', function() {
      const thumbnail = wrapper.find('Thumbnail');
      const img = wrapper.find('img');
      expect(thumbnail).to.have.lengthOf(1);
      expect(img.props().src).to.equal(`https://thumbnails.zooniverse.org/160x999/${resource.src}`);
    });

    it('should not have a delete button', function() {
      expect(wrapper.find('.image-selector__delete-button')).to.have.lengthOf(0);
    });

    it('should have a delete button if allowed', function() {
      wrapper.setProps({ allowDelete: true });
      expect(wrapper.find('.image-selector__delete-button')).to.have.lengthOf(1);
    });

    it('should call props.onDelete when delete button is clicked', function() {
      wrapper.find('.image-selector__delete-button').simulate('click');
      expect(onDeleteSpy.calledOnce).to.be.true;
    });
  });

  describe('if image should upload', function() {
    let wrapper;
    const onChangeSpy = sinon.spy();
    before(function() {
      wrapper = mount(<ImageSelector resourceType="avatar" onChange={onChangeSpy} />);
    });

    // it('calls onChange when file is selected', function() {
    //   const fileButton = wrapper.find('input');
    //   fileButton.simulate('change', { target: { files: [imageFile] } });
    //   expect(onChangeSpy.calledOnce).to.be.true;
    // });
  });
});
