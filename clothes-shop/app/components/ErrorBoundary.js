import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Оновлюємо стан, щоб наступний рендер показав запасний UI.
    return {hasError: true};
  }

  render() {
    if (this.state.hasError) {
      // Ви можете відрендерити будь-який власний запасний UI
      return <Text>Something went wrong.</Text>;
    }

    return this.props.children;
  }
}
