import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {WebView} from 'react-native-webview';
const windowHeight = Dimensions.get('window').height;

export class InAppWeb extends Component {
  url = this.props.route.params.url;
  constructor(props) {
    super(props);
    this.state = {
      load: true,
    };
  }

  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color="rgba(3, 230, 119, 0.5)"
        size="large"
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <WebView
          style={styles.WebViewStyle}
          source={{uri: this.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          renderLoading={this.ActivityIndicatorLoadingView}
          startInLoadingState={true}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  ActivityIndicatorStyle: {
    marginBottom: windowHeight - 120,
  },
});

export default InAppWeb;
