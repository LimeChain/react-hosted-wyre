import React from 'react'
import Wyre from 'react-wyre'
import ud from 'device-uuid';
import logo from './logo.svg';
import './App.css';

class WyreWidget extends React.Component {

  constructor(props) {
    super(props)

    this.onTopUpComplete = this.onTopUpComplete.bind(this);


    const urlParams = new URLSearchParams(window.location.search);
    const destAmount = parseFloat(urlParams.get('amount'));
    const ethereumAddress = urlParams.get('dest');
    const dest = `ethereum:${ethereumAddress}`;

    var du = new ud.DeviceUUID().parse();
    var dua = [
      du.language,
      du.platform,
      du.os,
      du.cpuCores,
      du.isAuthoritative,
      du.silkAccelerated,
      du.isKindleFire,
      du.isDesktop,
      du.isMobile,
      du.isTablet,
      du.isWindows,
      du.isLinux,
      du.isLinux64,
      du.isMac,
      du.isiPad,
      du.isiPhone,
      du.isiPod,
      du.isSmartTV,
      du.pixelDepth,
      du.isTouchScreen,
      ethereumAddress
    ];

    var uuid = du.hashMD5(dua.join(':'));

    console.log(process.env.REACT_APP_WYRE_ENV)
    const env = process.env.REACT_APP_WYRE_ENV;
    const accountId = process.env.REACT_APP_WYRE_ACCOUNT_ID;

    this.state = {
      open: false,
      destAmount,
      env,
      accountId,
      uuid,
      dest,
      mounted: false
    }

    console.log(this.state);

    console.log(window.location);


  }

  onTopUpComplete(result) {
    console.log('complete', result)
    window.location.replace(`/success?txHash=${result.networkTxId}`);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <Wyre
          config={{
            env: this.state.env,
            accountId: this.state.accountId,
            auth: {
              type: 'secretKey',
              secretKey: this.state.uuid
            },
            operation: {
              type: 'debitcard',
              destCurrency: 'DAI',
              destAmount: this.state.destAmount,
              dest: this.state.dest
            },
            style: {
              primaryColor: '#0055ff'
            }
          }}
          onReady={() => this.setState({ open: true })}
          onClose={event => console.log('close', event)}
          onComplete={event => this.onTopUpComplete(event)}
          open={this.state.open}>
          <img src={logo} className="App-logo" alt="logo" />
        </Wyre>
      </div >
    );
  }
}

export default WyreWidget;
