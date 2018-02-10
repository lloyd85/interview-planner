import React from 'react';
import { oneOfType, node, object, element, bool, string, any } from 'prop-types';

const ContentLoader = ({
  children,
  isLoading,
  contentLoaderText,
  contentLoaderGraphic,
}) => (
  isLoading ?
    contentLoaderGraphic || <p className="loader-text">{contentLoaderText}</p> : children
);

ContentLoader.propTypes = {
  children: oneOfType([node, object, element]).isRequired,
  isLoading: bool.isRequired,
  contentLoaderText: string,
  contentLoaderGraphic: any,
};

ContentLoader.defaultProps = {
  contentLoaderText: 'Is loading...',
};

export default ContentLoader;
