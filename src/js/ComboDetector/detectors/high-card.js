onmessage = ({ data }) => {
    postMessage({ isValid: false, winningCards: [], data });
};