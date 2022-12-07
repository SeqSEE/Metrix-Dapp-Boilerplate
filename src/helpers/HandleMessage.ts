// Handle incoming messages
export const handleMessage = async (
  message: any,
  handleAccountChanged: (payload?: any) => void
) => {
  if (message.data && message.data.target) {
    if (message.data.target.startsWith('metrimask') && message.data.message) {
      switch (message.data.message.type) {
        case 'GET_INPAGE_METRIMASK_ACCOUNT_VALUES':
          console.log('Updating MetriMask context');
          break;
        case 'METRIMASK_ACCOUNT_CHANGED':
          handleAccountChanged(message.data.message.payload);
          break;
        case 'METRIMASK_INSTALLED_OR_UPDATED':
          if (window) {
            window.location.reload();
          }
          break;
        case 'METRIMASK_WINDOW_CLOSE':
          console.log('Canceled!!!');
          handleAccountChanged();
          break;
        case 'SIGN_TX_URL_RESOLVED':
          break;
        case 'RPC_REQUEST':
          break;
        case 'RPC_RESPONSE':
          break;
        case 'RPC_SEND_TO_CONTRACT':
          break;
        default:
          break;
      }
    }
  }
};
