// @flow

import * as React from 'react';
import { NativeModules, requireNativeComponent } from 'react-native';
import PaymentRequest from './PaymentRequest';

type PKPaymentButtonType =
  // A button with the Apple Pay logo only.
  | 'plain'
  // A button with the text “Buy with” and the Apple Pay logo.
  | 'buy'
  // A button prompting the user to set up a card.
  | 'setUp'
  // A button with the text “Pay with” and the Apple Pay logo.
  | 'inStore'
  // A button with the text "Donate with" and the Apple Pay logo.
  | 'donate';

type PKPaymentButtonStyle =
  //   A white button with black lettering (shown here against a gray background to ensure visibility).
  | 'white'
  //   A white button with black lettering and a black outline.
  | 'whiteOutline'
  //   A black button with white lettering.
  | 'black';

type Props = $Exact<{
  style: ButtonStyle,
  type: ButtonType,
  width?: number,
  height?: number,
  onPress: Function,
  supportedNetworks?: string[]
}>;

const RNPKPaymentButton = requireNativeComponent('PKPaymentButton', null, {
  nativeOnly: { onPress: true },
});


export type ButtonType = PKPaymentButtonType;
export type ButtonStyle = PKPaymentButtonStyle;

export class PKPaymentButton extends React.Component<Props> {
  static defaultProps = {
    buttonStyle: 'black',
    buttonType: 'plain',
    height: 44,
  };

  state = {
    defaultToSetup: false
  }

  async componentDidMount() {
    const { supportedNetworks: customNetworks } = this.props;
    let supportedNetworks = customNetworks;
    if (supportedNetworks.length === 0) {
      supportedNetworks = await PaymentRequest.availableNetworks();
    }
    const havePaymentSetup =
      await PaymentRequest.canMakePaymentsUsingNetworks(supportedNetworks);
    if (!havePaymentSetup) {
      this.setState({ defaultToSetup: true })
    }
  }

  render() {
    const { defaultToSetup } = this.state;
    const buttonType = defaultToSetup ? 'setUp' : this.props.type;
    const onPress = defaultToSetup ? PaymentRequest.openPaymentSetup : this.props.onPress;
    return (
      <RNPKPaymentButton
        buttonStyle={this.props.style}
        buttonType={buttonType}
        onPress={onPress}
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}
