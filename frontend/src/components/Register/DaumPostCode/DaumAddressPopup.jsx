import ReactDom from 'react-dom';

const DaumAddressPopup = ({ children }) => {
  const el = document.getElementById('popupDom');
  return ReactDom.createPortal(children, el);
};

export default DaumAddressPopup;