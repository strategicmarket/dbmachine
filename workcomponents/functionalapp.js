// example functional program from ryan florence

let makeUpdater = apply => name => state => ({ [name]: apply(state[name]) })
let toggle = makeUpdater(previous => !previous);
let increment = makeUpdater(previous => previous + 1)
let toggleShipping = increment('showShipping')
let incrementRecipients = toggle('recipientCount')

class App extends Component {
  state = {
    showShipping: true,
    recipientCount: 1
  };

  handlePickupChange = event => {
    this.setState(toggleShipping)
  }
  addRecipient = () => {
    this.setState(incrementRecipients)
  }
}
